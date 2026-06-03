from django.db import models
from teams.models import Team


class Group(models.Model):
    class GroupChoices(models.TextChoices):
        A = ('A', 'Group A')
        B = ('B', 'Group B')
        C = ('C', 'Group C')
        D = ('D', 'Group D')
        E = ('E', 'Group E')
        F = ('F', 'Group F')
        G = ('G', 'Group G')
        H = ('H', 'Group H')
        I = ('I', 'Group I')
        J = ('J', 'Group J')
        K = ('K', 'Group K')
        L = ('L', 'Group L')

    name = models.CharField(max_length=1, choices=GroupChoices.choices, unique=True)
    teams = models.ManyToManyField(Team, related_name='groups', blank=True)
    next_p1 = models.PositiveIntegerField()
    next_p2 = models.PositiveIntegerField()
    next_p3 = models.PositiveIntegerField()

    class Meta:
        verbose_name = 'Match Group'
        verbose_name_plural = 'Match Groups'

    def __str__(self):
        return f'Group {self.name}'
