from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.db.models import Q, F, UniqueConstraint
from players.models import Player
from teams.models import Team

# Create your models here.
class Match(models.Model):
    class RoundChoices(models.TextChoices):
        GS = ('GS', 'Group Stage')
        PO = ('PO', 'Play-Off')
        R16 = ('R16', 'Round of 16')
        QF = ('QF', 'Quarter Final')
        SF = ('SF', 'Semi Final')
        F = ('F', 'Final')


    home_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='home_matches')
    away_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='away_matches')
    round = models.CharField(choices=RoundChoices.choices, max_length=10)
    score_home_team = models.PositiveSmallIntegerField(default=0)
    score_away_team = models.PositiveSmallIntegerField(default=0)
    leg = models.IntegerField(choices=[(1, '1st Leg'), (2, '2nd Leg')], null=True, blank=True)

    class Meta:
        verbose_name_plural = 'matches'
        constraints = [
            # CONSTRAINT 1: Unique home_team per tournament+round+leg
            UniqueConstraint(
                fields=['round', 'leg', 'home_team', 'away_team'],
                name='unique_home_team_per_leg'
            )
        ]

    def clean(self):
        super().clean()

        errors = {}

        # Check teams cannot play themselves
        if self.home_team == self.away_team:
            errors['away_team'] = 'You cannot have the same team as the home team!'

        # Check home_team uniqueness per tournament+round+leg
        if self.home_team and self.round in ['PO','R16', 'QF', 'SF', 'F']:
            existing = Match.objects.filter(
                Q(home_team=self.home_team) | Q(away_team=self.home_team),
                round=self.round,
                leg=self.leg
            ).exclude(id=self.pk).count()

            if existing > 0:
                errors['home_team'] = f'{self.home_team.name} already plays in different match.'

        # Check away_team uniqueness per tournament+round+leg
        if self.away_team and self.round in ['PO', 'R16', 'QF', 'SF', 'F']:
            existing = Match.objects.filter(
                Q(home_team=self.away_team) | Q(away_team=self.away_team),
                round=self.round,
                leg=self.leg
            ).exclude(id=self.pk).count()

            if existing > 0:
                errors['away_team'] = f'{self.away_team.name} already plays in different match.'

        # Check max matches per round and leg
        round_limits = {'PO':8, 'R16': 8, 'QF': 4, 'SF': 2, 'F': 1}
        if self.round in round_limits:
            limit = round_limits[self.round]
            existing_matches = Match.objects.filter(round=self.round,leg=self.leg).exclude(id=self.pk).count()
            if existing_matches >= limit:
                errors['round'] = f'The {self.round} can only have a maximum of {limit} matches.'

        # Check leg only for knockout stage
        if self.round not in ['PO', 'R16', 'QF', 'SF', 'F']:
            if self.leg:
                errors['leg'] = 'The legs are only for knockout stage.'

        # Check only for 2nd leg if 1st leg pair is available
        if self.leg == 2 and self.home_team and self.away_team:
            match_first_leg = Match.objects.filter(
                Q(home_team=self.home_team) | Q(away_team=self.home_team),
                Q(home_team=self.away_team) | Q(away_team=self.away_team),
                round=self.round,
                leg=1,
            )

            if not match_first_leg.exists():
                errors['leg'] = 'A second leg could be added only if we have the pair for the first leg'

        # Check the pairing rules for second leg
        if self.leg == 2 and self.home_team and self.away_team:
            match_first_leg = Match.objects.filter(
                home_team=self.away_team,
                away_team=self.home_team,
                round=self.round,
                leg=1,
            )
            if not match_first_leg.exists():
                errors['home_team'] = f'The teams should play in the reverse order'

        if errors:
            raise ValidationError(errors)

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.home_team} vs {self.away_team}'

class Goal(models.Model):
    match = models.ForeignKey(Match, on_delete=models.CASCADE, related_name='goals')
    goalscorer = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='goals')
    assist_player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='assists', null=True, blank=True)
    team_scored = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='goals')
    minute = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(125)])
    is_penalty = models.BooleanField(default=False)
    is_own_goal = models.BooleanField(default=False, editable=False)

    class Meta:
        ordering = ['minute']

    def clean(self):
        super().clean()

        errors = {}

        # Check: Goals must be equal or lower than the score - to do
        if self.match and self.team_scored:
            goal_scored = Goal.objects.filter(
                team_scored=self.team_scored,
                match=self.match
            ).exclude(id=self.pk).count()

            if self.team_scored == self.match.home_team and goal_scored >= self.match.score_home_team:
                errors['team_scored'] = 'The goals must be equal or lower than the score.'

            if self.team_scored == self.match.away_team and goal_scored >= self.match.score_away_team:
                errors['team_scored'] = 'The goals must be equal or lower than the score.'

        # Check Team scored can only be part of the match teams
        if self.team_scored and self.match:
            if self.team_scored != self.match.home_team and self.team_scored != self.match.away_team:
                errors['team_scored'] = f"Invalid entry: {self.team_scored} is not part of the match!."

        # Check The same player cannot score a goal and give an assist
        if self.goalscorer and self.assist_player:
            if self.goalscorer == self.assist_player:
                errors['goalscorer'] = 'You cannot have the same goalscorer!'

        # Check The goal can be scored only by player of match teams
        if self.goalscorer and self.match:
            if self.goalscorer.team != self.match.home_team and self.goalscorer.team != self.match.away_team:
                errors['goalscorer'] = f"Invalid entry: {self.goalscorer} plays for {self.goalscorer.team}, which is not playing in this match."

        # Check The assist can be done only by player of match teams
        if self.assist_player:
            if self.assist_player.team != self.match.home_team and self.assist_player.team != self.match.away_team:
                errors['assist_player'] = f"Invalid entry: {self.assist_player} plays for {self.assist_player.team}, which is not playing in this match."

        if errors:
            raise ValidationError(errors)

    def save(self, *args, **kwargs):
        self.full_clean()

        if self.goalscorer.team != self.team_scored:
            self.is_own_goal = True
        else:
            self.is_own_goal = False

        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.goalscorer} in {self.minute} minute'

