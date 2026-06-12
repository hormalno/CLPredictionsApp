from django.contrib import admin, messages
from matches.models import Match
from goals.models import Goal

# Register your models here.
class GoalInline(admin.TabularInline):
    model = Goal
    extra = 1
    fields = ['team_scored', 'goalscorer', 'assist_player', 'minute', 'is_penalty']
    autocomplete_fields = ['goalscorer', 'assist_player']

def close_match_predictions(modeladmin, request, queryset):
    mp = queryset.filter(is_closed=False).update(is_closed=True)
    modeladmin.message_user(request, f'Closed {mp} match for prediction.', messages.SUCCESS)

close_match_predictions.short_description = 'Close predictions for selected matches'


def open_match_predictions(modeladmin, request, queryset):
    mp = queryset.filter(is_closed=True).update(is_closed=False)
    modeladmin.message_user(request, f'Opened {mp} match for prediction.', messages.SUCCESS)

open_match_predictions.short_description = 'Open predictions for selected matches'

@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    inlines = [GoalInline]
    list_display = ('__str__', 'home_team', 'away_team', 'round', 'leg', 'get_score', 'is_finished', 'is_closed')
    actions = [close_match_predictions, open_match_predictions]

    def get_score(self, match):
        return f'{match.score_home_team}-{match.score_away_team}'
