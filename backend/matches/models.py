from django.core.exceptions import ValidationError
from django.db import models
from django.db.models import Q, UniqueConstraint
from groups.models import Group
from teams.models import Team


class Match(models.Model):
    class RoundChoices(models.TextChoices):
        GS = ('GS', 'Group Stage')
        PO = ('PO', 'Play-Off')
        R32 = ('R32', 'Round of 32')
        R16 = ('R16', 'Round of 16')
        QF = ('QF', 'Quarter Final')
        SF = ('SF', 'Semi Final')
        F = ('F', 'Final')

    class LegChoices(models.IntegerChoices):
        FIRST = (1, 'First Leg')
        SECOND = (2, 'Second Leg')

    home_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='home_matches', null=True, blank=True)
    away_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='away_matches', null=True, blank=True)
    home_placeholder = models.CharField(max_length=10, blank=True, default='')
    away_placeholder = models.CharField(max_length=10, blank=True, default='')
    score_home_team = models.PositiveSmallIntegerField(null=True, blank=True)
    score_away_team = models.PositiveSmallIntegerField(null=True, blank=True)
    home_penalties = models.PositiveSmallIntegerField(null=True, blank=True)
    away_penalties = models.PositiveSmallIntegerField(null=True, blank=True)
    round = models.CharField(choices=RoundChoices.choices, max_length=10)
    group = models.ForeignKey(Group, on_delete=models.SET_NULL, null=True, blank=True, related_name='matches')
    leg = models.IntegerField(choices=LegChoices.choices, null=True, blank=True)
    stadium = models.CharField(max_length=50)
    location = models.CharField(max_length=50)
    date = models.DateTimeField()
    is_finished = models.BooleanField(default=False)
    is_closed = models.BooleanField(default=False)
    next_match = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='feeder_matches')
    next_match_slot = models.CharField(max_length=4, choices=[('home', 'Home'), ('away', 'Away')], blank=True, default='')

    class Meta:
        verbose_name_plural = 'matches'
        constraints = [
            UniqueConstraint(
                fields=['round', 'leg', 'home_team', 'away_team'],
                name='unique_home_team_per_leg'
            )
        ]

    def clean(self):
        super().clean()

        errors = {}

        if self.home_team and self.away_team and self.home_team == self.away_team:
            errors['away_team'] = 'You cannot have the same team as the home team!'

        if self.home_team and self.round in ['PO', 'R32', 'R16', 'QF', 'SF', 'F']:
            existing = Match.objects.filter(
                Q(home_team=self.home_team) | Q(away_team=self.home_team),
                round=self.round,
                leg=self.leg
            ).exclude(id=self.pk).count()
            if existing > 0:
                errors['home_team'] = f'{self.home_team.name} already plays in different match.'

        if self.away_team and self.round in ['PO', 'R32', 'R16', 'QF', 'SF', 'F']:
            existing = Match.objects.filter(
                Q(home_team=self.away_team) | Q(away_team=self.away_team),
                round=self.round,
                leg=self.leg
            ).exclude(id=self.pk).count()
            if existing > 0:
                errors['away_team'] = f'{self.away_team.name} already plays in different match.'

        round_limits = {'PO': 8, 'R32': 16, 'R16': 8, 'QF': 4, 'SF': 2, 'F': 1}
        if self.round in round_limits:
            limit = round_limits[self.round]
            existing_matches = Match.objects.filter(round=self.round, leg=self.leg).exclude(id=self.pk).count()
            if existing_matches >= limit:
                errors['round'] = f'The {self.round} can only have a maximum of {limit} matches.'

        if self.round not in ['PO', 'R32', 'R16', 'QF', 'SF', 'F']:
            if self.leg:
                errors['leg'] = 'The legs are only for knockout stage.'
            if self.home_penalties is not None or self.away_penalties is not None:
                errors['home_penalties'] = 'Penalties are only for non-group stage matches.'

        if self.leg == 2 and self.home_team and self.away_team:
            match_first_leg = Match.objects.filter(
                Q(home_team=self.home_team) | Q(away_team=self.home_team),
                Q(home_team=self.away_team) | Q(away_team=self.away_team),
                round=self.round,
                leg=1,
            )
            if not match_first_leg.exists():
                errors['leg'] = 'A second leg could be added only if we have the pair for the first leg'

        if self.leg == 2 and self.home_team and self.away_team:
            match_first_leg = Match.objects.filter(
                home_team=self.away_team,
                away_team=self.home_team,
                round=self.round,
                leg=1,
            )
            if not match_first_leg.exists():
                errors['home_team'] = 'The teams should play in the reverse order'

        if errors:
            raise ValidationError(errors)

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.home_team} vs {self.away_team} {self.round}'
