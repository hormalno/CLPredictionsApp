from rest_framework import serializers
from groups.models import Group
from teams.serializers import TeamSerializer


class GroupSerializer(serializers.ModelSerializer):
    teams = serializers.SerializerMethodField()

    class Meta:
        model = Group
        fields = ['id', 'name', 'next_p1', 'slot_p1', 'next_p2', 'slot_p2', 'next_p3', 'slot_p3', 'teams']

    def get_teams(self, group):
        finished_matches = group.matches.filter(is_finished=True).select_related('home_team', 'away_team')

        standings = {}
        for team in group.teams.all().distinct():
            team_data = TeamSerializer(team, context=self.context).data
            standings[team.id] = {
                **team_data,
                'wins': 0,
                'draws': 0,
                'losses': 0,
                'goalsFor': 0,
                'goalsAgainst': 0,
                'points': 0,
            }

        for match in finished_matches:
            home_id = match.home_team_id
            away_id = match.away_team_id
            home_goals = match.score_home_team
            away_goals = match.score_away_team

            if home_id not in standings or away_id not in standings:
                continue

            standings[home_id]['goalsFor'] += home_goals
            standings[home_id]['goalsAgainst'] += away_goals
            standings[away_id]['goalsFor'] += away_goals
            standings[away_id]['goalsAgainst'] += home_goals

            if home_goals > away_goals:
                standings[home_id]['wins'] += 1
                standings[home_id]['points'] += 3
                standings[away_id]['losses'] += 1
            elif home_goals < away_goals:
                standings[away_id]['wins'] += 1
                standings[away_id]['points'] += 3
                standings[home_id]['losses'] += 1
            else:
                standings[home_id]['draws'] += 1
                standings[home_id]['points'] += 1
                standings[away_id]['draws'] += 1
                standings[away_id]['points'] += 1

        return sorted(
            standings.values(),
            key=lambda t: (-t['points'], -(t['goalsFor'] - t['goalsAgainst']), -t['goalsFor']),
        )
