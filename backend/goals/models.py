from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from players.models import Player
from teams.models import Team


class Goal(models.Model):
    match = models.ForeignKey('matches.Match', on_delete=models.CASCADE, related_name='goals')
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

        if self.match and self.team_scored:
            goal_scored = Goal.objects.filter(
                team_scored=self.team_scored,
                match=self.match
            ).exclude(id=self.pk).count()

            if self.team_scored == self.match.home_team and goal_scored >= self.match.score_home_team:
                errors['team_scored'] = 'The goals must be equal or lower than the score.'

            if self.team_scored == self.match.away_team and goal_scored >= self.match.score_away_team:
                errors['team_scored'] = 'The goals must be equal or lower than the score.'

        if self.team_scored and self.match:
            if self.team_scored != self.match.home_team and self.team_scored != self.match.away_team:
                errors['team_scored'] = f"Invalid entry: {self.team_scored} is not part of the match!."

        if self.goalscorer and self.assist_player:
            if self.goalscorer == self.assist_player:
                errors['goalscorer'] = 'You cannot have the same goalscorer!'

        if self.goalscorer and self.match:
            if self.goalscorer.team != self.match.home_team and self.goalscorer.team != self.match.away_team:
                errors['goalscorer'] = f"Invalid entry: {self.goalscorer} plays for {self.goalscorer.team}, which is not playing in this match."

        if self.assist_player:
            if self.assist_player.team != self.match.home_team and self.assist_player.team != self.match.away_team:
                errors['assist_player'] = f"Invalid entry: {self.assist_player} plays for {self.assist_player.team}, which is not playing in this match."

        if errors:
            raise ValidationError(errors)

    def save(self, *args, **kwargs):
        self.full_clean()
        self.is_own_goal = self.goalscorer.team != self.team_scored
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.goalscorer} in {self.minute} minute'
