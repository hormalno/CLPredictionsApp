from rest_framework import serializers
from matches.models import Match
from predictions.models import MatchPrediction, ScorePrediction


class UserMatchPredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MatchPrediction
        fields = ['id', 'match', 'outcome', 'correct_outcome', 'home_team_score', 'away_team_score', 'correct_home_team_score', 'correct_away_team_score', 'points']


class SubmitPredictionSerializer(serializers.Serializer):
    match = serializers.PrimaryKeyRelatedField(queryset=Match.objects.filter(is_finished=False))
    home_team_score = serializers.IntegerField(min_value=0, max_value=99)
    away_team_score = serializers.IntegerField(min_value=0, max_value=99)
