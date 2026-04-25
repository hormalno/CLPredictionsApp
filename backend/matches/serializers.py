from rest_framework import serializers
from matches.models import Match
from teams.serializers import TeamSerializer


class MatchSerializer(serializers.ModelSerializer):
    home_team = TeamSerializer()
    away_team = TeamSerializer()
    round_display = serializers.CharField(source='get_round_display', read_only=True)

    class Meta:
        model = Match
        fields = [
            'id',
            'home_team',
            'away_team',
            'round',
            'round_display',
            'group',
            'score_home_team',
            'score_away_team',
            'stadium',
            'location',
            'date',
            'is_finished',
        ]
