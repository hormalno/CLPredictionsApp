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
        Match.objects.filter(pk=match.pk).update(
            score_home_team=serializer.validated_data['score_home_team'],
            score_away_team=serializer.validated_data['score_away_team'],
            is_finished=True,
        )
        match.refresh_from_db()
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


