from rest_framework import serializers
from players.models import Player
from teams.serializers import TeamSerializer


class PlayerSerializer(serializers.ModelSerializer):
    team = TeamSerializer(read_only=True)

    class Meta:
        model = Player
        fields = ['id', 'name', 'position', 'jersey_number', 'team']


class PlayerSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['id', 'name']


class TopScorerEntrySerializer(serializers.ModelSerializer):
    team = TeamSerializer(read_only=True)
    goal_count = serializers.IntegerField(read_only=True)
    assist_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Player
        fields = ['id', 'name', 'position', 'jersey_number', 'team', 'goal_count', 'assist_count']
