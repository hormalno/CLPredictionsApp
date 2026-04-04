from django.core.validators import MaxValueValidator
from django.db import models
from teams.models import Team
from teams.mixins import CountryMixin


# Create your models here.
class Player(CountryMixin):
    class PositionChoices(models.TextChoices):
        FW = ('FW', 'Forward')
        MF = ('MF', 'Midfielder')
        DF = ('DF', 'Defender')
        GK = ('GK', 'Goalkeeper')

    name = models.CharField(max_length=100)
    position = models.CharField(max_length=100, choices=PositionChoices.choices)
    jersey_number = models.PositiveIntegerField(validators=[MaxValueValidator(99)])
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='players')

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=('team', 'jersey_number'),
                name='unique_jersey_per_team'
            )
        ]

    def __str__(self):
        return f"{self.name}"