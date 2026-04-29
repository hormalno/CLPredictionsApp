from django.contrib import admin, messages
from predictions.models import MatchPrediction, TopScorerPrediction


@admin.register(MatchPrediction)
class MatchPredictionAdmin(admin.ModelAdmin):
    list_display = ('match', 'outcome', 'points', 'user')

@admin.register(TopScorerPrediction)
class TopScorerPredictionAdmin(admin.ModelAdmin):
    list_display = ('player', 'user')
