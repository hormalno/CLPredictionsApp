from django.db.models.signals import pre_save
from django.dispatch import receiver
from matches.models import Match


@receiver(pre_save, sender=Match)
def close_match_on_finished(sender, instance, **kwargs):
    if not instance.pk:
        return
    try:
        old = Match.objects.get(pk=instance.pk)
    except Match.DoesNotExist:
        return

    just_finished = not old.is_finished and instance.is_finished
    if just_finished:
        instance.is_closed = True
