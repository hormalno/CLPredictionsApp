# Create your models here.
from django.core.validators import MinLengthValidator
from django.db import models
from django.db.models.functions import Lower
from teams.mixins import CountryMixin

class Team(CountryMixin):
    name = models.CharField(max_length=100, unique=True)
    short_name = models.CharField(max_length=3, validators=[MinLengthValidator(3)])
    logo = models.ImageField(upload_to='logos/', blank=True, default='')

    class Meta:
        constraints = [
            models.UniqueConstraint(
                Lower('name'),
                name='unique_team_name_case_insensitive',
            )
        ]

    def __str__(self):
        return self.name

