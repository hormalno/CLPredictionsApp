from rest_framework import serializers
from players.serializers import PlayerSummarySerializer
from goals.models import Goal

class GoalSerializer(serializers.ModelSerializer):
    goalscorer = PlayerSummarySerializer(read_only=True)
    assist_player = PlayerSummarySerializer(read_only=True)
    team_scored = serializers.CharField(source='team_scored.name', read_only=True)

    class Meta:
        model = Goal
        fields = [
            'id',
            'goalscorer',
            'assist_player',
            'team_scored',
            'minute',
            'is_penalty',
            'is_own_goal',
        ]

class GoalCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = ['goalscorer', 'assist_player', 'team_scored', 'minute', 'is_penalty', 'is_own_goal']

