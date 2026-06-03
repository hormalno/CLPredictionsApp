from django.core.exceptions import ValidationError as DjangoValidationError
from django.db import transaction
from django.db.models import Case, IntegerField, Value, When
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError as DRFValidationError
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
from rest_framework.response import Response
from matches.models import Match
from matches.serializers import MatchSerializer, MatchDetailSerializer, MatchResultSerializer
from goals.models import Goal
from goals.serializers import GoalCreateSerializer

KNOCKOUT_ROUNDS = {'PO', 'R32', 'R16', 'QF', 'SF', 'F'}


def _get_knockout_winner(match):
    home, away = match.score_home_team, match.score_away_team
    if home > away:
        return match.home_team
    if away > home:
        return match.away_team
    # Scores equal — decide by penalties
    hp, ap = match.home_penalties, match.away_penalties
    if hp is not None and ap is not None:
        return match.home_team if hp > ap else match.away_team
    return None


def _compute_group_standings(group):
    standings = {}
    for team in group.teams.all():
        standings[team.id] = {'team': team, 'points': 0, 'gf': 0, 'ga': 0}

    for m in group.matches.filter(is_finished=True).select_related('home_team', 'away_team'):
        hid, aid = m.home_team_id, m.away_team_id
        if hid not in standings or aid not in standings:
            continue
        hg, ag = m.score_home_team, m.score_away_team
        standings[hid]['gf'] += hg
        standings[hid]['ga'] += ag
        standings[aid]['gf'] += ag
        standings[aid]['ga'] += hg
        if hg > ag:
            standings[hid]['points'] += 3
        elif ag > hg:
            standings[aid]['points'] += 3
        else:
            standings[hid]['points'] += 1
            standings[aid]['points'] += 1

    return sorted(standings.values(), key=lambda t: (-t['points'], -(t['gf'] - t['ga']), -t['gf']))


def _propagate_group_stage_results(match):
    if match.round != 'GS' or not match.group_id:
        return

    group = match.group
    total = group.matches.count()
    finished = group.matches.filter(is_finished=True).count()
    if finished < total:
        return

    ranked = _compute_group_standings(group)
    if len(ranked) < 2:
        return

    placements = [
        (ranked[0]['team'], group.next_p1, f'1{group.name}'),
        (ranked[1]['team'], group.next_p2, f'2{group.name}'),
    ]

    for team, next_match_id, placeholder in placements:
        if not next_match_id:
            continue
        Match.objects.filter(match_id=next_match_id, home_placeholder=placeholder).update(home_team=team)
        Match.objects.filter(match_id=next_match_id, away_placeholder=placeholder).update(away_team=team)


def _propagate_knockout_winner(match):
    if match.round not in KNOCKOUT_ROUNDS or not match.next_match_id:
        return
    winner = _get_knockout_winner(match)
    if not winner:
        return
    slot = match.next_match_slot
    if slot == 'home':
        Match.objects.filter(pk=match.next_match_id).update(home_team=winner)
    elif slot == 'away':
        Match.objects.filter(pk=match.next_match_id).update(away_team=winner)


ROUND_ORDER = Case(
    When(round='GS', then=Value(1)),
    When(round='PO', then=Value(2)),
    When(round='R32', then=Value(3)),
    When(round='R16', then=Value(4)),
    When(round='QF', then=Value(5)),
    When(round='SF', then=Value(6)),
    When(round='F', then=Value(7)),
    default=Value(99),
    output_field=IntegerField(),
)


class MatchViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return MatchDetailSerializer
        return MatchSerializer

    def get_queryset(self):
        queryset = (
            Match.objects
            .select_related('home_team', 'away_team')
            .annotate(round_order=ROUND_ORDER)
            .order_by('round_order', 'date')
        )
        if self.action == 'retrieve':
            queryset = queryset.prefetch_related(
                'goals__goalscorer',
                'goals__assist_player',
                'goals__team_scored',
            )
        return queryset

    @action(detail=False, url_path='admin-list', permission_classes=[IsAdminUser])
    def admin_list(self, request):
        queryset = self.get_queryset().prefetch_related(
            'goals__goalscorer',
            'goals__assist_player',
            'goals__team_scored',
        )
        serializer = MatchDetailSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)


    @action(detail=False, url_path='group-stage')
    def group_stage(self, request):
        queryset = self.get_queryset().filter(round='GS')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, url_path='knockout')
    def knockout(self, request):
        queryset = self.get_queryset().filter(round__in=['PO', 'R32', 'R16', 'QF', 'SF', 'F'])
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, url_path='upcoming')
    def upcoming(self, request):
        queryset = self.get_queryset().filter(is_finished=False)[:4]
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, url_path='results')
    def results(self, request):
        queryset = self.get_queryset().filter(is_finished=True)[:4]
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)   

    @action(detail=True, methods=['post'], url_path='submit-result', permission_classes=[IsAdminUser])
    def submit_result(self, request, pk=None):
        match = self.get_object()
        serializer = MatchResultSerializer(match, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        update_data = {
            'score_home_team': serializer.validated_data['score_home_team'],
            'score_away_team': serializer.validated_data['score_away_team'],
            'is_finished': True,
        }
        if 'home_penalties' in serializer.validated_data:
            update_data['home_penalties'] = serializer.validated_data['home_penalties']
        if 'away_penalties' in serializer.validated_data:
            update_data['away_penalties'] = serializer.validated_data['away_penalties']

        # Knockout matches must have a clear winner — ties require penalties
        if match.round in KNOCKOUT_ROUNDS:
            home = serializer.validated_data['score_home_team']
            away = serializer.validated_data['score_away_team']
            if home == away:
                hp = serializer.validated_data.get('home_penalties')
                ap = serializer.validated_data.get('away_penalties')
                if hp is None or ap is None:
                    raise DRFValidationError(
                        'The match ended in a draw. Please provide penalty scores to determine the winner.'
                    )
                if hp == ap:
                    raise DRFValidationError(
                        'Penalty scores must have a winner — they cannot also be equal.'
                    )

        Match.objects.filter(pk=match.pk).update(**update_data)
        match.refresh_from_db()

        _propagate_knockout_winner(match)
        _propagate_group_stage_results(match)

        return Response(MatchDetailSerializer(match, context={'request': request}).data)
    
    @action(detail=True, methods=['post'], url_path='add-goals', permission_classes=[IsAdminUser])
    def add_goals(self, request, pk=None):
        match = self.get_object()
        serializer = GoalCreateSerializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        try:
            with transaction.atomic():
                for goal_data in serializer.validated_data:
                    Goal(match=match, **goal_data).save()
        except DjangoValidationError as e:
            raise DRFValidationError(e.message_dict)
        match.refresh_from_db()
        return Response(MatchDetailSerializer(match, context={'request': request}).data)


