from rest_framework import serializers
from groups.models import Group
from matches.models import Match
from players.models import Player
from players.serializers import PlayerSerializer
from predictions.models import GroupPrediction, KnockoutPrediction, MatchPrediction, TopScorerPrediction, TopTeamPrediction
from teams.models import Team
from teams.serializers import TeamSerializer

KNOCKOUT_ROUNDS = {
    Match.RoundChoices.R32,
    Match.RoundChoices.R16,
    Match.RoundChoices.QF,
    Match.RoundChoices.SF,
    Match.RoundChoices.THIRD_PLACE,
    Match.RoundChoices.F,
}


class UserMatchPredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MatchPrediction
        fields = ['id', 'match', 'outcome', 'correct_outcome', 'home_team_score', 'away_team_score', 'correct_home_team_score', 'correct_away_team_score', 'points']


class SubmitPredictionSerializer(serializers.Serializer):
    match = serializers.PrimaryKeyRelatedField(queryset=Match.objects.filter(is_finished=False))
    home_team_score = serializers.IntegerField(min_value=0, max_value=99)
    away_team_score = serializers.IntegerField(min_value=0, max_value=99)


class SubmitKnockoutPredictionSerializer(serializers.Serializer):
    match = serializers.PrimaryKeyRelatedField(
        queryset=Match.objects.filter(is_closed=False, round__in=KNOCKOUT_ROUNDS)
    )
    predicted_home_team = serializers.PrimaryKeyRelatedField(
        queryset=Team.objects.all(), required=False, allow_null=True
    )
    predicted_away_team = serializers.PrimaryKeyRelatedField(
        queryset=Team.objects.all(), required=False, allow_null=True
    )
    predicted_winner = serializers.PrimaryKeyRelatedField(
        queryset=Team.objects.all(), required=False, allow_null=True
    )

    def validate(self, data):
        predicted_winner = data.get('predicted_winner')
        if not predicted_winner:
            return data

        match = data['match']
        user = self.context['request'].user

        home_team = data.get('predicted_home_team')
        away_team = data.get('predicted_away_team')

        # Fall back to the existing prediction if teams are not in this request
        if home_team is None or away_team is None:
            existing = KnockoutPrediction.objects.filter(match=match, user=user).first()
            if home_team is None:
                home_team = existing.predicted_home_team if existing else None
            if away_team is None:
                away_team = existing.predicted_away_team if existing else None

        if not home_team or not away_team:
            raise serializers.ValidationError(
                'You must predict both teams before predicting a winner.'
            )

        if predicted_winner not in (home_team, away_team):
            raise serializers.ValidationError(
                {'predicted_winner': 'Winner must be one of the two predicted teams.'}
            )

        return data


class KnockoutMatchDetailSerializer(serializers.ModelSerializer):
    home_team = TeamSerializer(allow_null=True, read_only=True)
    away_team = TeamSerializer(allow_null=True, read_only=True)

    class Meta:
        model = Match
        fields = ['id', 'date', 'location', 'round', 'home_team', 'away_team', 'home_placeholder', 'away_placeholder', 'is_closed']


class UserKnockoutPredictionSerializer(serializers.ModelSerializer):
    predicted_home_team = TeamSerializer(allow_null=True, read_only=True)
    predicted_away_team = TeamSerializer(allow_null=True, read_only=True)
    predicted_winner = TeamSerializer(allow_null=True, read_only=True)
    match_detail = KnockoutMatchDetailSerializer(source='match', read_only=True)

    class Meta:
        model = KnockoutPrediction
        fields = [
            'id', 'match', 'match_detail',
            'predicted_home_team', 'predicted_away_team', 'predicted_winner',
            'home_team_correct', 'away_team_correct', 'winner_correct',
            'points',
        ]

class MatchesUserScoreSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = MatchPrediction
        fields = ['match', 'username', 'points']


class KnockoutUserScoreSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = KnockoutPrediction
        fields = ['match', 'username', 'points']


class MatchPredictionSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    is_finished = serializers.BooleanField(source='match.is_finished', read_only=True)

    class Meta:
        model = MatchPrediction
        fields = ['id', 'username', 'home_team_score', 'away_team_score', 'points', 'correct_outcome', 'is_finished']


class KnockoutPredictionPerMatchSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    predicted_home_team = TeamSerializer(allow_null=True, read_only=True)
    predicted_away_team = TeamSerializer(allow_null=True, read_only=True)
    predicted_winner = TeamSerializer(allow_null=True, read_only=True)
    is_finished = serializers.BooleanField(source='match.is_finished', read_only=True)

    class Meta:
        model = KnockoutPrediction
        fields = [
            'id', 'username',
            'predicted_home_team', 'predicted_away_team', 'predicted_winner',
            'home_team_correct', 'away_team_correct', 'winner_correct',
            'points', 'is_finished',
        ]


class SubmitTopScorerPredictionSerializer(serializers.Serializer):
    player = serializers.PrimaryKeyRelatedField(queryset=Player.objects.all())


class UserTopScorerPredictionSerializer(serializers.ModelSerializer):
    player = PlayerSerializer(read_only=True)
    tournament_locked = serializers.SerializerMethodField()

    class Meta:
        model = TopScorerPrediction
        fields = ['id', 'player', 'player_correct', 'points', 'tournament_locked']

    def get_tournament_locked(self, obj):
        return Match.objects.filter(is_finished=True).exists()


class SubmitGroupPredictionSerializer(serializers.Serializer):
    group = serializers.PrimaryKeyRelatedField(queryset=Group.objects.all())
    group_winner_predict = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all())

    def validate(self, data):
        group = data['group']
        team = data['group_winner_predict']
        if not group.teams.filter(pk=team.pk).exists():
            raise serializers.ValidationError(
                {'group_winner_predict': f'{team} is not in Group {group.name}.'}
            )
        return data


class UserGroupPredictionSerializer(serializers.ModelSerializer):
    group_name = serializers.CharField(source='group.name', read_only=True)
    group_winner_predict = TeamSerializer(read_only=True)
    locked = serializers.SerializerMethodField()

    class Meta:
        model = GroupPrediction
        fields = ['id', 'group', 'group_name', 'group_winner_predict', 'group_winner_correct', 'points', 'locked']

    def get_locked(self, obj):
        return Match.objects.filter(is_finished=True).exists()


class SubmitTopTeamPredictionSerializer(serializers.Serializer):
    team = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all())


class UserTopTeamPredictionSerializer(serializers.ModelSerializer):
    team = TeamSerializer(read_only=True)

    class Meta:
        model = TopTeamPrediction
        fields = ['id', 'team', 'team_correct', 'points']