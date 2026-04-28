from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from groups.models import Group
from groups.serializers import GroupSerializer


class GroupViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = GroupSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Group.objects.prefetch_related('teams', 'matches__home_team', 'matches__away_team').order_by('name')
