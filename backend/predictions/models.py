import re

from django.core.exceptions import ValidationError
from django.db import models
from app import settings
from matches.models import Match
from players.models import Player
from groups.models import Group
from teams.models import Team

# Create your models here.
class MatchPrediction(models.Model):
    match = models.ForeignKey(Match, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    home_team_score = models.PositiveIntegerField()
    away_team_score = models.PositiveIntegerField()
    correct_outcome = models.BooleanField(null=True, blank=True)
    correct_home_team_score = models.BooleanField(null=True, blank=True)
    correct_away_team_score = models.BooleanField(null=True, blank=True)
    points = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = ('match', 'user', 'points')

    @property
    def outcome(self):
        if self.home_team_score > self.away_team_score:
            return '1'
        elif self.home_team_score == self.away_team_score:
            return 'X'
        return '2'

class GroupPrediction(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='predictions')
    group_winner_predict = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='group_winner_predictions')
    group_winner_correct = models.BooleanField(null=True, blank=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='group_predictions')
    points = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = ('group', 'user')

class TopScorerPrediction(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    player_correct = models.BooleanField(null=True, blank=True)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    points = models.PositiveIntegerField(default=0)


class KnockoutPrediction(models.Model):
    match = models.ForeignKey(Match, on_delete=models.CASCADE, related_name='knockout_predictions')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    predicted_home_team = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, blank=True, related_name='predicted_as_home')
    predicted_away_team = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, blank=True, related_name='predicted_as_away')
    predicted_winner = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, blank=True, related_name='predicted_as_winner')
    home_team_correct = models.BooleanField(null=True, blank=True)
    away_team_correct = models.BooleanField(null=True, blank=True)
    winner_correct = models.BooleanField(null=True, blank=True)
    points = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = ('match', 'user')

    KNOCKOUT_ROUNDS = {'R32', 'R16', 'QF', 'SF', '3P', 'F'}

    def _validate_team_for_slot(self, team, placeholder):
        """Return an error string if team is not eligible for the given placeholder, else None."""
        if not team or not placeholder:
            return None

        from groups.models import Group

        m = re.match(r'^[12]([A-L])$', placeholder)
        if m:
            group_letter = m.group(1)
            try:
                group = Group.objects.get(name=group_letter)
            except Group.DoesNotExist:
                return None
            if not group.teams.filter(pk=team.pk).exists():
                return f'{team} is not eligible for this slot — must be from Group {group_letter}.'
            return None

        if placeholder.startswith('3'):
            match_id = self.match.match_id if self.match else None
            if not match_id:
                return None
            eligible_ids = set(
                Group.objects.filter(next_p3__contains=[match_id])
                .values_list('teams__id', flat=True)
            )
            if eligible_ids and team.pk not in eligible_ids:
                return f'{team} is not eligible for this 3rd-place slot.'
            return None

        return None  # WINNER slots — no group restriction

    def _validate_no_duplicate_teams(self):
        """Return a dict of field errors if any predicted team is already used in another match of the same round."""
        if not self.match_id or not self.user_id:
            return {}

        already_used = set(
            KnockoutPrediction.objects
            .filter(user_id=self.user_id, match__round=self.match.round)
            .exclude(pk=self.pk)
            .values_list('predicted_home_team_id', 'predicted_away_team_id')
        )
        used_ids = {tid for pair in already_used for tid in pair if tid is not None}

        errors = {}
        if self.predicted_home_team_id and self.predicted_away_team_id and self.predicted_home_team_id == self.predicted_away_team_id:
            errors['predicted_away_team'] = 'Home and away teams cannot be the same.'
        else:
            if self.predicted_home_team_id and self.predicted_home_team_id in used_ids:
                errors['predicted_home_team'] = f'{self.predicted_home_team} is already predicted in another {self.match.round} match.'
            if self.predicted_away_team_id and self.predicted_away_team_id in used_ids:
                errors['predicted_away_team'] = f'{self.predicted_away_team} is already predicted in another {self.match.round} match.'
        return errors

    def clean(self):
        if self.match and self.match.round not in self.KNOCKOUT_ROUNDS:
            raise ValidationError({'match': 'Knockout predictions are only allowed for R32, R16, QF, SF, or F matches.'})

        errors = {}

        if self.match and self.match.round == 'R32':
            home_err = self._validate_team_for_slot(self.predicted_home_team, self.match.home_placeholder)
            if home_err:
                errors['predicted_home_team'] = home_err
            away_err = self._validate_team_for_slot(self.predicted_away_team, self.match.away_placeholder)
            if away_err:
                errors['predicted_away_team'] = away_err

        errors.update(self._validate_no_duplicate_teams())

        if (
            self.predicted_winner
            and self.predicted_home_team
            and self.predicted_away_team
            and self.predicted_winner not in (self.predicted_home_team, self.predicted_away_team)
        ):
            errors['predicted_winner'] = 'Winner must be one of the two predicted teams.'

        if errors:
            raise ValidationError(errors)

    def propagate_winner(self):
        next_match = self.match.next_match
        if not next_match or not self.predicted_winner:
            return

        next_prediction, _ = KnockoutPrediction.objects.get_or_create(
            match=next_match,
            user=self.user,
        )

        if self.match.next_match_slot == 'home':
            next_prediction.predicted_home_team = self.predicted_winner
        else:
            next_prediction.predicted_away_team = self.predicted_winner

        next_prediction.save()

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)
        self.propagate_winner()


class TopTeamPrediction(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    team_correct = models.BooleanField(null=True, blank=True)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    points = models.PositiveIntegerField(default=0)


class UserScore(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='score')
    points = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['-points']

    def __str__(self):
        return f'{self.user} — {self.points} pts'




