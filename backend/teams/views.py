from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from teams.models import Team
from teams.serializers import TeamSerializer


class TeamListView(generics.ListAPIView):
    queryset = Team.objects.all().order_by('name')
    serializer_class = TeamSerializer
    permission_classes = [IsAuthenticated]
