from django.contrib import admin
from players.models import Player

# Register your models here.
@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ('name','team','jersey_number','position')
    list_filter = ('team',)
    exclude = ('country_name',)
    ordering = ('id',)
