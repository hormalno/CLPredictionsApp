from django.contrib import admin, messages
from predictions.models import MatchPrediction, TopScorerPrediction, KnockoutPrediction


@admin.register(MatchPrediction)
class MatchPredictionAdmin(admin.ModelAdmin):
    list_display = ('match', 'outcome', 'points', 'user')

@admin.register(KnockoutPrediction)
class KnockoutPredictionAdmin(admin.ModelAdmin):
    list_display = ('user', 'match', 'predicted_home_team', 'predicted_away_team', 'predicted_winner', 'points')
    list_filter = ('user',)
    search_fields = ('user__username',)

@admin.register(TopScorerPrediction)
class TopScorerPredictionAdmin(admin.ModelAdmin):
    list_display = ('player', 'user')
