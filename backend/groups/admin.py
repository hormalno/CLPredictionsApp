from django.contrib import admin
from groups.models import Group

# Register your models here.
@admin.register(Group)
class AdminGroup(admin.ModelAdmin):
    list_display = ('name',)
        