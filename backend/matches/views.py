from django.db.models import Case, IntegerField, Value, When
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from matches.models import Match
from matches.serializers import MatchSerializer

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
    serializer_class = MatchSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return (
            Match.objects
            .select_related('home_team', 'away_team')
            .annotate(round_order=ROUND_ORDER)
            .order_by('round_order', 'date')
        )

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

