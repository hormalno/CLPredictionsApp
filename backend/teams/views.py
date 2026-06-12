from django.db.models import Count, OuterRef, Subquery
from django.db.models.functions import Coalesce
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from goals.models import Goal
from teams.models import Team
from teams.serializers import TeamGoalStatsSerializer, TeamSerializer


class TeamListView(generics.ListAPIView):
    queryset = Team.objects.all().order_by('name')
    serializer_class = TeamSerializer
    permission_classes = [IsAuthenticated]


class TopTeamGoalStatsView(generics.ListAPIView):
    serializer_class = TeamGoalStatsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        goals_subq = (
            Goal.objects
            .filter(team_scored=OuterRef('pk'), is_own_goal=False)
            .values('team_scored')
            .annotate(c=Count('id'))
            .values('c')
        )
        assists_subq = (
            Goal.objects
            .filter(assist_player__team=OuterRef('pk'), is_own_goal=False, assist_player__isnull=False)
            .values('assist_player__team')
            .annotate(c=Count('id'))
            .values('c')
        )
        return (
            Team.objects
            .annotate(
                total_goals=Coalesce(Subquery(goals_subq), 0),
                total_assists=Coalesce(Subquery(assists_subq), 0),
            )
            .order_by('-total_goals', '-total_assists')[:20]
        )
