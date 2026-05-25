from django.core.exceptions import ValidationError
from django.db import models
from app import settings
from matches.models import Match
from players.models import Player
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


class TopScorerPrediction(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    player_correct = models.BooleanField(null=True, blank=True)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)


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

    KNOCKOUT_ROUNDS = {'R32', 'R16', 'QF', 'SF', 'F'}

    def clean(self):
        if self.match and self.match.round not in self.KNOCKOUT_ROUNDS:
            raise ValidationError({'match': 'Knockout predictions are only allowed for R32, R16, QF, SF, or F matches.'})

        if (
            self.predicted_winner
            and self.predicted_home_team
            and self.predicted_away_team
            and self.predicted_winner not in (self.predicted_home_team, self.predicted_away_team)
        ):
            raise ValidationError({'predicted_winner': 'Winner must be one of the two predicted teams.'})

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


class UserScore(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='score')
    points = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['-points']

    def __str__(self):
        return f'{self.user} — {self.points} pts'




