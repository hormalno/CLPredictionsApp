from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from players.models import Player
from players.serializers import PlayerSummarySerializer


class PlayerViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = PlayerSummarySerializer

    def get_queryset(self):
        queryset = Player.objects.all()
        team_id = self.request.query_params.get('team')
        if team_id:
            queryset = queryset.filter(team_id=team_id)
        return queryset
