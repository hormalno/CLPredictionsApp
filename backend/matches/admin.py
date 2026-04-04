from django.contrib import admin
from matches.models import Match, Goal

# Register your models here.
class GoalInline(admin.TabularInline):
    model = Goal
    extra = 1
    fields = ['team_scored', 'goalscorer', 'assist_player', 'minute', 'is_penalty']

@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    inlines = [GoalInline]
    list_display = ('__str__','home_team', 'away_team', 'round', 'leg', 'get_score')

    def get_score(self, match):
        return f'{match.score_home_team}-{match.score_away_team}'
