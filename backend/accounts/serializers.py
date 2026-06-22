from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from .models import User


def email_is_taken(email, exclude_pk=None):
    """AbstractUser.email is not unique at the DB level, so guard it here."""
    qs = User.objects.filter(email__iexact=email)
    if exclude_pk is not None:
        qs = qs.exclude(pk=exclude_pk)
    return qs.exists()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2')

    def validate_email(self, value):
        if value and email_is_taken(value):
            raise serializers.ValidationError('This email is already in use.')
        return value

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({'password': 'Passwords do not match.'})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        return User.objects.create_user(**validated_data)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'points', 'is_superuser')
        read_only_fields = ('points', 'is_superuser')

    def validate_email(self, value):
        exclude_pk = self.instance.pk if self.instance else None
        if value and email_is_taken(value, exclude_pk=exclude_pk):
            raise serializers.ValidationError('This email is already in use.')
        return value


class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True, validators=[validate_password])

    def validate_current_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError('Current password is incorrect.')
        return value

    def save(self, **kwargs):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user


class LeaderboardSerializer(serializers.ModelSerializer):
    rank = serializers.IntegerField(read_only=True)
    outcome_count = serializers.IntegerField(read_only=True)
    exact_count = serializers.IntegerField(read_only=True)
    single_score_count = serializers.IntegerField(read_only=True)
    knockout_R32_correct = serializers.IntegerField(read_only=True)
    knockout_R16_correct = serializers.IntegerField(read_only=True)
    knockout_QF_correct = serializers.IntegerField(read_only=True)
    knockout_SF_correct = serializers.IntegerField(read_only=True)
    knockout_3P_correct = serializers.IntegerField(read_only=True)
    knockout_F_correct = serializers.IntegerField(read_only=True)
    group_winner_count = serializers.IntegerField(read_only=True)
    trend = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'points',
                  'outcome_count', 'exact_count', 'single_score_count',
                  'knockout_R32_correct', 'knockout_R16_correct',
                  'knockout_QF_correct', 'knockout_SF_correct',
                  'knockout_3P_correct', 'knockout_F_correct',
                  'group_winner_count',
                  'rank', 'trend')

    def get_trend(self, obj) -> str:
        prev = getattr(obj, 'prev_rank', None)
        if prev is None:
            return 'new'
        if obj.rank < prev:
            return 'up'
        if obj.rank > prev:
            return 'down'
        return 'same'