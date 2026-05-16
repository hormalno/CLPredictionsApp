from django.db.models import Case, IntegerField, Value, When
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
from rest_framework.response import Response
from matches.models import Match
from matches.serializers import MatchSerializer, MatchDetailSerializer, MatchResultSerializer
from goals.serializers import GoalCreateSerializer

ROUND_ORDER = Case(
    When(round='PO', then=Value(1)),
    When(round='GS', then=Value(2)),
    When(round='R16', then=Value(3)),
    When(round='QF', then=Value(4)),
    When(round='SF', then=Value(5)),
    When(round='F', then=Value(6)),
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
    
    @action(detail=True, methods=['post'], url_path='add-goal', permission_classes=[IsAdminUser])
    def add_goal(self, request, pk=None):
        match = self.get_object()
        serializer = GoalCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            serializer.save(match=match)
        except DjangoValidationError as e:
            raise DRFValidationError(e.message_dict)
        match.refresh_from_db()
        return Response(MatchDetailSerializer(match, context={'request': request}).data)


