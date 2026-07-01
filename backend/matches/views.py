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


def _score_knockout_teams_for(match_ids):
    """Score team-slot correctness for the given knockout matches once their
    teams have been filled by a feeder result."""
    ids = [i for i in match_ids if i]
    if not ids:
        return
    from predictions.signals import score_knockout_teams
    for m in Match.objects.filter(pk__in=ids):
        score_knockout_teams(m)


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


def _get_knockout_loser(match):
    home, away = match.score_home_team, match.score_away_team
    if home > away:
        return match.away_team
    if away > home:
        return match.home_team
    hp, ap = match.home_penalties, match.away_penalties
    if hp is not None and ap is not None:
        return match.away_team if hp > ap else match.home_team
    return None


def _propagate_knockout_loser(match):
    if match.round != Match.RoundChoices.SF:
        return
    loser = _get_knockout_loser(match)
    if not loser:
        return
    third_place_match = Match.objects.filter(round=Match.RoundChoices.THIRD_PLACE).first()
    if not third_place_match:
        return
    slot = match.next_match_slot  # same slot as in the Final — home/away mirrors 3P
    if slot == 'home':
        Match.objects.filter(pk=third_place_match.pk).update(home_team=loser)
    elif slot == 'away':
        Match.objects.filter(pk=third_place_match.pk).update(away_team=loser)


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
        (ranked[0]['team'], f'1{group.name}'),
        (ranked[1]['team'], f'2{group.name}'),
    ]

    affected_ids = set()
    for team, placeholder in placements:
        home_qs = Match.objects.filter(home_placeholder=placeholder)
        affected_ids.update(home_qs.values_list('pk', flat=True))
        home_qs.update(home_team=team)
        away_qs = Match.objects.filter(away_placeholder=placeholder)
        affected_ids.update(away_qs.values_list('pk', flat=True))
        away_qs.update(away_team=team)
    _score_knockout_teams_for(affected_ids)


def _propagate_third_place_teams():
    """
    After all group-stage matches are done, rank every group's 3rd-place team
    by points → goal difference → goals scored, take the best 8, then use
    backtracking to find the unique valid assignment of each qualifier to an
    R32 match according to the group's next_p3 list.
    """
    from groups.models import Group

    all_groups = list(Group.objects.all())

    # Wait until every group has finished all its matches
    for group in all_groups:
        total = group.matches.count()
        finished = group.matches.filter(is_finished=True).count()
        if finished < total:
            return

    # Collect third-place finisher + stats for every group
    third_place = []
    for group in all_groups:
        ranked = _compute_group_standings(group)
        if len(ranked) < 3:
            continue
        entry = ranked[2]
        third_place.append({
            'team': entry['team'],
            'group': group,
            'points': entry['points'],
            'gd': entry['gf'] - entry['ga'],
            'gf': entry['gf'],
        })

    # Best 8 by: points desc → GD desc → GF desc
    third_place.sort(key=lambda x: (-x['points'], -x['gd'], -x['gf']))
    qualifiers = third_place[:8]

    # Build option sets and sort by most-constrained first (MRV heuristic)
    options = {q['group'].name: set(q['group'].next_p3) for q in qualifiers}
    group_names = sorted(
        [q['group'].name for q in qualifiers],
        key=lambda n: len(options[n]),
    )
    assignment = {}  # group_name → R32 match_id

    def assign(idx):
        if idx == len(group_names):
            return True
        name = group_names[idx]
        used = set(assignment.values())
        for match_id in options[name]:
            if match_id not in used:
                assignment[name] = match_id
                if assign(idx + 1):
                    return True
                del assignment[name]
        return False

    if not assign(0):
        return  # No valid assignment exists (should never happen with correct seed data)

    team_by_group = {q['group'].name: q['team'] for q in qualifiers}
    slot_by_group = {q['group'].name: q['group'].slot_p3 for q in qualifiers}

    affected_ids = set()
    for group_name, match_id in assignment.items():
        team = team_by_group[group_name]
        qs = Match.objects.filter(match_id=match_id)
        affected_ids.update(qs.values_list('pk', flat=True))
        if slot_by_group[group_name] == 'home':
            qs.update(home_team=team)
        else:
            qs.update(away_team=team)
    _score_knockout_teams_for(affected_ids)


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
    _score_knockout_teams_for([match.next_match_id])


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
        queryset = self.get_queryset().filter(round__in=['PO', 'R32', 'R16', 'QF', 'SF', '3P', 'F'])
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, url_path='upcoming')
    def upcoming(self, request):
        queryset = self.get_queryset().filter(is_finished=False)[:4]
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, url_path='results')
    def results(self, request):
        queryset = self.get_queryset().filter(is_finished=True).order_by('-date')[:4]
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

        if match.round in KNOCKOUT_ROUNDS and (match.home_team is None or match.away_team is None):
            raise DRFValidationError(
                'Cannot submit a result until both teams are confirmed (no placeholders).'
            )

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

        try:
            from accounts.utils import take_rank_snapshot
            take_rank_snapshot()
        except Exception:
            pass

        Match.objects.filter(pk=match.pk).update(**update_data)
        match.refresh_from_db()

        from predictions.signals import score_match_predictions, score_group_predictions
        score_match_predictions(match)

        _propagate_knockout_winner(match)
        _propagate_knockout_loser(match)
        _propagate_group_stage_results(match)
        _propagate_third_place_teams()

        if match.round == 'GS' and match.group_id:
            score_group_predictions(match.group)

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


