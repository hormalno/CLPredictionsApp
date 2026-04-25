from django.db.models import Sum
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from matches.models import Match
from predictions.models import MatchPrediction, ScorePrediction, UserScore

def get_outcome(home_score, away_score):
    if home_score > away_score:
        return '1'
    elif home_score == away_score:
        return 'X'
    else:
        return '2'


@receiver(pre_save, sender=Match)
def store_old_state(sender, instance, **kwargs):
    if instance.pk:
        try:
            old = Match.objects.get(pk=instance.pk)
            instance._old_home = old.score_home_team
            instance._old_away = old.score_away_team
            instance._old_is_finished = old.is_finished
        except Match.DoesNotExist:
            instance._old_home = None
            instance._old_away = None
            instance._old_is_finished = False
    else:
        instance._old_home = None
        instance._old_away = None
        instance._old_is_finished = False


@receiver(post_save, sender=Match)
def update_prediction_points(sender, instance, **kwargs):
    if not instance.is_finished:
        return

    old_home = getattr(instance, '_old_home', None)
    old_away = getattr(instance, '_old_away', None)
    old_is_finished = getattr(instance, '_old_is_finished', False)

    scores_changed = (
        old_home != instance.score_home_team or
        old_away != instance.score_away_team
    )
    just_finished = not old_is_finished and instance.is_finished

    if not scores_changed and not just_finished:
        return

    

    actual_outcome = get_outcome(instance.score_home_team, instance.score_away_team)
    affected_users = set()

    for mp in MatchPrediction.objects.filter(match=instance):
        mp.correct_outcome = mp.outcome == actual_outcome
        mp.points = 1 if mp.correct_outcome else 0
        mp.save(update_fields=['correct_outcome', 'points'])
        affected_users.add(mp.user_id)

    for sp in ScorePrediction.objects.filter(match=instance):
        sp.correct_home_team_score = sp.home_team_score == instance.score_home_team
        sp.correct_away_team_score = sp.away_team_score == instance.score_away_team
        if sp.correct_home_team_score and sp.correct_away_team_score:
            sp.points = 3
        elif sp.correct_home_team_score or sp.correct_away_team_score:
            sp.points = 1
        else:
            sp.points = 0
        sp.save(update_fields=['correct_home_team_score', 'correct_away_team_score', 'points'])
        affected_users.add(sp.user_id)

    for user_id in affected_users:
        mp_pts = MatchPrediction.objects.filter(user_id=user_id).aggregate(t=Sum('points'))['t'] or 0
        sp_pts = ScorePrediction.objects.filter(user_id=user_id).aggregate(t=Sum('points'))['t'] or 0
        UserScore.objects.update_or_create(
            user_id=user_id,
            defaults={'points': mp_pts + sp_pts},
        )
