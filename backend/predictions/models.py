from django.db import models
from app import settings
from matches.models import Match
from players.models import Player

# Create your models here.
class Prediction(models.Model):
    match = models.ForeignKey(Match, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    points = models.PositiveIntegerField(default=0)

    class Meta:
        abstract = True
        unique_together = ('match', 'user')

class MatchPrediction(Prediction):
    outcome = models.CharField(max_length=1, choices=(('1', '1'), ('X', 'X'), ('2', '2')))
    correct_outcome = models.BooleanField(null=True, blank=True)

class ScorePrediction(Prediction):
    home_team_score = models.PositiveIntegerField()
    away_team_score = models.PositiveIntegerField()
    correct_home_team_score = models.BooleanField(null=True, blank=True)
    correct_away_team_score = models.BooleanField(null=True, blank=True)

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




