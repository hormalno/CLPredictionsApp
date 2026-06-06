from django.db.models import Count, Q
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from players.models import Player
from players.serializers import PlayerSerializer, TopScorerEntrySerializer


class PlayerViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = PlayerSerializer

    def get_queryset(self):
        queryset = Player.objects.all()
        team_id = self.request.query_params.get('team')
        if team_id:
            queryset = queryset.filter(team_id=team_id)
        return queryset


class TopGoalScorersView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        players = (
            Player.objects
            .annotate(
                goal_count=Count('goals', filter=Q(goals__is_own_goal=False)),
                assist_count=Count('assists'),
            )
            .order_by('-goal_count', '-assist_count', 'name')[:20]
        )
        return Response(TopScorerEntrySerializer(players, many=True, context={'request': request}).data)
