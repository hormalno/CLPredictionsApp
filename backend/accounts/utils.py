from django.db.models import Window
from django.db.models.functions import DenseRank


def take_rank_snapshot():
    from .models import RankSnapshot, User

    users = list(
        User.objects.filter(is_superuser=False, is_staff=False).annotate(
            current_rank=Window(expression=DenseRank(), order_by='-points')
        ).order_by('-points', 'username')
    )
    RankSnapshot.objects.bulk_create([
        RankSnapshot(user=u, rank=u.current_rank, points=u.points)
        for u in users
    ])
