from django.contrib import admin
from goals.models import Goal


@admin.register(Goal)
class GoalAdmin(admin.ModelAdmin):
    list_display = ('goalscorer', 'assist_player', 'team_scored', 'match', 'minute', 'is_penalty', 'is_own_goal')
    list_filter = (
        ('goalscorer', admin.RelatedOnlyFieldListFilter),
        ('assist_player', admin.RelatedOnlyFieldListFilter),
        'is_penalty',
        'is_own_goal',
    )
    autocomplete_fields = ('goalscorer', 'assist_player')
    search_fields = ('goalscorer__name', 'assist_player__name')
