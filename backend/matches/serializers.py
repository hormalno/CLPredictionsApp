from rest_framework import serializers
from matches.models import Match
from teams.serializers import TeamSerializer
from goals.serializers import GoalSerializer


class MatchSerializer(serializers.ModelSerializer):
    home_team = TeamSerializer(allow_null=True)
    away_team = TeamSerializer(allow_null=True)
    round_display = serializers.CharField(source='get_round_display', read_only=True)
    group_display = serializers.CharField(source='group.name', read_only=True, allow_null=True)

    class Meta:
        model = Match
        fields = [
            'id',
            'home_team',
            'away_team',
            'home_placeholder',
            'away_placeholder',
            'round',
            'round_display',
            'group',
            'group_display',
            'leg',
            'score_home_team',
            'score_away_team',
            'home_penalties',
            'away_penalties',
            'stadium',
            'location',
            'date',
            'is_finished',
            'is_closed',
        ]


class MatchDetailSerializer(MatchSerializer):
    goals = GoalSerializer(many=True, read_only=True)

    class Meta(MatchSerializer.Meta):
        fields = MatchSerializer.Meta.fields + ['goals']


class MatchResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = ['score_home_team', 'score_away_team', 'home_penalties', 'away_penalties']
