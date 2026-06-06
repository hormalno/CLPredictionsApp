from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    points = models.PositiveIntegerField(default=0)


class RankSnapshot(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='rank_snapshots')
    rank = models.PositiveIntegerField()
    points = models.PositiveIntegerField()
    taken_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-taken_at']
        indexes = [models.Index(fields=['user', '-taken_at'])]