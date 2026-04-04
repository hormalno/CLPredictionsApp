from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from matches.models import Match


def get_outcome(home_score, away_score):
    if home_score > away_score:
        return '1'
    elif home_score == away_score:
        return 'X'
    else:
        return '2'


@receiver(pre_save, sender=Match)
def store_old_scores(sender, instance, **kwargs):
    if instance.pk:
        try:
            old = Match.objects.get(pk=instance.pk)
            instance._old_home = old.score_home_team
            instance._old_away = old.score_away_team
        except Match.DoesNotExist:
            instance._old_home = None
            instance._old_away = None
    else:
        instance._old_home = None
        instance._old_away = None


@receiver(post_save, sender=Match)
def update_prediction_points(sender, instance, **kwargs):
    old_home = getattr(instance, '_old_home', None)
    old_away = getattr(instance, '_old_away', None)

    scores_changed = (
        old_home != instance.score_home_team or
        old_away != instance.score_away_team
    )

    if not scores_changed:
        return

    from django.db.models import Sum
    from predictions.models import MatchPrediction, ScorePrediction, UserScore

    actual_outcome = get_outcome(instance.score_home_team, instance.score_away_team)
    affected_users = set()

    for mp in MatchPrediction.objects.filter(match=instance):
        mp.points = 1 if mp.outcome == actual_outcome else 0
        mp.save(update_fields=['points'])
        affected_users.add(mp.user_id)

    for sp in ScorePrediction.objects.filter(match=instance):
        if sp.home_team_score == instance.score_home_team and sp.away_team_score == instance.score_away_team:
            sp.points = 3
        elif sp.home_team_score == instance.score_home_team or sp.away_team_score == instance.score_away_team:
            sp.points = 1
        else:
            sp.points = 0
        sp.save(update_fields=['points'])
        affected_users.add(sp.user_id)

    for user_id in affected_users:
        mp_pts = MatchPrediction.objects.filter(user_id=user_id).aggregate(t=Sum('points'))['t'] or 0
        sp_pts = ScorePrediction.objects.filter(user_id=user_id).aggregate(t=Sum('points'))['t'] or 0
        UserScore.objects.update_or_create(
            user_id=user_id,
            defaults={'points': mp_pts + sp_pts},
        )
