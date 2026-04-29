from django.contrib import admin
from predictions.models import ScorePrediction, MatchPrediction, TopScorerPrediction


@admin.register(MatchPrediction)
class MatchPredictionAdmin(admin.ModelAdmin):
    list_display = ('match', 'outcome', 'points', 'user')

@admin.register(ScorePrediction)
class ScorePredictionAdmin(admin.ModelAdmin):
    list_display = ('match', 'home_team_score', 'away_team_score', 'points', 'user')

@admin.register(TopScorerPrediction)
class TopScorerPredictionAdmin(admin.ModelAdmin):
    list_display = ('player', 'user')
