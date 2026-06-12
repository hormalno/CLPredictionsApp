from rest_framework import serializers
from teams.models import Team


class TeamSerializer(serializers.ModelSerializer):
    group_name = serializers.SerializerMethodField()

    def get_group_name(self, obj):
        group = obj.groups.first()
        return group.name if group else ''

    class Meta:
        model = Team
        fields = ['id', 'name', 'short_name', 'logo', 'group_name']


class TeamGoalStatsSerializer(serializers.ModelSerializer):
    group_name = serializers.SerializerMethodField()
    total_goals = serializers.IntegerField()
    total_assists = serializers.IntegerField()

    def get_group_name(self, obj):
        group = obj.groups.first()
        return group.name if group else ''

    class Meta:
        model = Team
        fields = ['id', 'name', 'short_name', 'logo', 'group_name', 'total_goals', 'total_assists']
