from django.db import models
from app import settings
from matches.models import Match
from players.models import Player

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


class UserScore(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='score')
    points = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['-points']

    def __str__(self):
        return f'{self.user} — {self.points} pts'




