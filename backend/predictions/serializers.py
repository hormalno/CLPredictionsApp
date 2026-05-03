from rest_framework import serializers
from matches.models import Match
from predictions.models import MatchPrediction


class UserMatchPredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MatchPrediction
        fields = ['id', 'match', 'outcome', 'correct_outcome', 'home_team_score', 'away_team_score', 'correct_home_team_score', 'correct_away_team_score', 'points']


class SubmitPredictionSerializer(serializers.Serializer):
    match = serializers.PrimaryKeyRelatedField(queryset=Match.objects.filter(is_finished=False))
    home_team_score = serializers.IntegerField(min_value=0, max_value=99)
    away_team_score = serializers.IntegerField(min_value=0, max_value=99)

class MatchesUserScoreSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = MatchPrediction
        fields = ['match', 'username', 'points']


class MatchPredictionSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    is_finished = serializers.BooleanField(source='match.is_finished', read_only=True)

    class Meta:
        model = MatchPrediction
        fields = ['id', 'username', 'home_team_score', 'away_team_score', 'points', 'correct_outcome', 'is_finished']