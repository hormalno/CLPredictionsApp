from rest_framework import serializers
from players.models import Player


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['id', 'name', 'position', 'jersey_number', 'team']


class PlayerSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['id', 'name']
