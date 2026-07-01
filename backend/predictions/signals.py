from django.db.models import Count, Sum
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from matches.models import Match
from predictions.models import GroupPrediction, KnockoutPrediction, MatchPrediction, TopScorerPrediction, TopTeamPrediction, UserScore

KNOCKOUT_TEAM_POINTS = {
    Match.RoundChoices.R32: 3,
    Match.RoundChoices.R16: 5,
    Match.RoundChoices.QF: 9,
    Match.RoundChoices.SF: 12,
    Match.RoundChoices.F:  15,
}

CHAMPION_POINTS = 17


def get_outcome(home_score, away_score):
    if home_score > away_score:
        return '1'
    elif home_score == away_score:
        return 'X'
    else:
        return '2'


def _recalculate_user_score(user_id):
    mp_pts = MatchPrediction.objects.filter(user_id=user_id).aggregate(t=Sum('points'))['t'] or 0
    kp_pts = KnockoutPrediction.objects.filter(user_id=user_id).aggregate(t=Sum('points'))['t'] or 0
    ts_pts = TopScorerPrediction.objects.filter(user_id=user_id).aggregate(t=Sum('points'))['t'] or 0
    gp_pts = GroupPrediction.objects.filter(user_id=user_id).aggregate(t=Sum('points'))['t'] or 0
    tt_pts = TopTeamPrediction.objects.filter(user_id=user_id).aggregate(t=Sum('points'))['t'] or 0
    UserScore.objects.update_or_create(
        user_id=user_id,
        defaults={'points': mp_pts + kp_pts + ts_pts + gp_pts + tt_pts},
    )


def _score_top_team_predictions():
    """Score TopTeamPredictions based on which team scored the most goals across all finished matches.
    Returns the set of affected user IDs."""
    from matches.models import Match
    from django.db.models import F

    totals = {}
    for m in Match.objects.filter(is_finished=True).exclude(score_home_team=None):
        totals[m.home_team_id] = totals.get(m.home_team_id, 0) + m.score_home_team
        totals[m.away_team_id] = totals.get(m.away_team_id, 0) + m.score_away_team

    if not totals:
        return set()

    top_team_id = max(totals, key=lambda tid: totals[tid])
    affected = set()

    for pred in TopTeamPrediction.objects.all():
        correct = pred.team_id == top_team_id
        pred.team_correct = correct
        pred.points = 10 if correct else 0
        pred.save(update_fields=['team_correct', 'points'])
        affected.add(pred.user_id)

    return affected


def _score_top_scorer_predictions():
    """Score all TopScorerPredictions based on the tournament's top scorer (most non-own goals).
    Returns the set of affected user IDs."""
    from goals.models import Goal

    top = (
        Goal.objects
        .filter(is_own_goal=False)
        .values('goalscorer_id')
        .annotate(n=Count('id'))
        .order_by('-n')
        .first()
    )
    if not top:
        return set()

    top_scorer_id = top['goalscorer_id']
    affected = set()

    for pred in TopScorerPrediction.objects.all():
        correct = pred.player_id == top_scorer_id
        pred.player_correct = correct
        pred.points = 15 if correct else 0
        pred.save(update_fields=['player_correct', 'points'])
        affected.add(pred.user_id)

    return affected


def score_group_predictions(group):
    """Award 10 pts to users who correctly predicted the group winner. Runs only when all group matches are finished."""
    total = group.matches.count()
    finished = group.matches.filter(is_finished=True).count()
    if finished < total:
        return

    standings = {}
    for team in group.teams.all():
        standings[team.id] = {'team': team, 'points': 0, 'gd': 0, 'gf': 0}

    for m in group.matches.filter(is_finished=True).select_related('home_team', 'away_team'):
        hid, aid = m.home_team_id, m.away_team_id
        if hid not in standings or aid not in standings:
            continue
        hg, ag = m.score_home_team, m.score_away_team
        standings[hid]['gf'] += hg
        standings[hid]['gd'] += hg - ag
        standings[aid]['gf'] += ag
        standings[aid]['gd'] += ag - hg
        if hg > ag:
            standings[hid]['points'] += 3
        elif ag > hg:
            standings[aid]['points'] += 3
        else:
            standings[hid]['points'] += 1
            standings[aid]['points'] += 1

    ranked = sorted(standings.values(), key=lambda t: (-t['points'], -t['gd'], -t['gf']))
    if not ranked:
        return

    actual_winner_id = ranked[0]['team'].id
    affected = set()

    for gp in GroupPrediction.objects.filter(group=group):
        correct = gp.group_winner_predict_id == actual_winner_id
        gp.group_winner_correct = correct
        gp.points = 7 if correct else 0
        gp.save(update_fields=['group_winner_correct', 'points'])
        affected.add(gp.user_id)

    from accounts.models import User
    for user_id in affected:
        _recalculate_user_score(user_id)
        total_pts = (
            (MatchPrediction.objects.filter(user_id=user_id).aggregate(t=Sum('points'))['t'] or 0) +
            (KnockoutPrediction.objects.filter(user_id=user_id).aggregate(t=Sum('points'))['t'] or 0) +
            (TopScorerPrediction.objects.filter(user_id=user_id).aggregate(t=Sum('points'))['t'] or 0) +
            (GroupPrediction.objects.filter(user_id=user_id).aggregate(t=Sum('points'))['t'] or 0) +
            (TopTeamPrediction.objects.filter(user_id=user_id).aggregate(t=Sum('points'))['t'] or 0)
        )
        User.objects.filter(pk=user_id).update(points=total_pts)


@receiver(pre_save, sender=Match)
def store_old_state(sender, instance, **kwargs):
    if instance.pk:
        try:
            old = Match.objects.get(pk=instance.pk)
            instance._old_home_score = old.score_home_team
            instance._old_away_score = old.score_away_team
            instance._old_is_finished = old.is_finished
            instance._old_is_closed = old.is_closed
            instance._old_home_team_id = old.home_team_id
            instance._old_away_team_id = old.away_team_id
        except Match.DoesNotExist:
            instance._old_home_score = None
            instance._old_away_score = None
            instance._old_is_finished = False
            instance._old_is_closed = False
            instance._old_home_team_id = None
            instance._old_away_team_id = None
    else:
        instance._old_home_score = None
        instance._old_away_score = None
        instance._old_is_finished = False
        instance._old_is_closed = False
        instance._old_home_team_id = None
        instance._old_away_team_id = None


@receiver(post_save, sender=Match)
def update_prediction_points(sender, instance, **kwargs):
    if not instance.is_closed:
        return

    old_is_closed = getattr(instance, '_old_is_closed', False)
    just_closed = not old_is_closed and instance.is_closed

    old_home_score = getattr(instance, '_old_home_score', None)
    old_away_score = getattr(instance, '_old_away_score', None)
    old_is_finished = getattr(instance, '_old_is_finished', False)
    old_home_team_id = getattr(instance, '_old_home_team_id', None)
    old_away_team_id = getattr(instance, '_old_away_team_id', None)

    scores_changed = (
        old_home_score != instance.score_home_team or
        old_away_score != instance.score_away_team
    )
    just_finished = not old_is_finished and instance.is_finished
    teams_changed = (
        old_home_team_id != instance.home_team_id or
        old_away_team_id != instance.away_team_id
    )

    affected_users = set()

    # ── Group stage predictions ───────────────────────────────────────────────
    if instance.is_finished and (just_closed or just_finished or scores_changed):
        actual_outcome = get_outcome(instance.score_home_team, instance.score_away_team)

        for mp in MatchPrediction.objects.filter(match=instance):
            mp.correct_outcome = mp.outcome == actual_outcome
            mp.correct_home_team_score = mp.home_team_score == instance.score_home_team
            mp.correct_away_team_score = mp.away_team_score == instance.score_away_team

            points = 2 if mp.correct_outcome else 0
            if mp.correct_home_team_score and mp.correct_away_team_score:
                points += 5
            elif mp.correct_home_team_score or mp.correct_away_team_score:
                points += 1
            mp.points = points

            mp.save(update_fields=['correct_outcome', 'correct_home_team_score', 'correct_away_team_score', 'points'])
            affected_users.add(mp.user_id)

    # ── Knockout predictions ──────────────────────────────────────────────────
    if instance.round in KNOCKOUT_TEAM_POINTS and (just_closed or teams_changed or just_finished or scores_changed):
        team_pts = KNOCKOUT_TEAM_POINTS[instance.round]

        actual_winner_id = None
        if instance.is_finished and instance.score_home_team is not None and instance.score_away_team is not None:
            if instance.score_home_team > instance.score_away_team:
                actual_winner_id = instance.home_team_id
            elif instance.score_away_team > instance.score_home_team:
                actual_winner_id = instance.away_team_id

        for kp in KnockoutPrediction.objects.filter(match=instance):
            points = 0

            if instance.home_team_id:
                kp.home_team_correct = kp.predicted_home_team_id == instance.home_team_id
                if kp.home_team_correct:
                    points += team_pts

            if instance.away_team_id:
                kp.away_team_correct = kp.predicted_away_team_id == instance.away_team_id
                if kp.away_team_correct:
                    points += team_pts

            if actual_winner_id is not None:
                kp.winner_correct = kp.predicted_winner_id == actual_winner_id
                if kp.winner_correct and instance.round == Match.RoundChoices.F:
                    points += CHAMPION_POINTS

            kp.points = points
            kp.save(update_fields=[
                'home_team_correct', 'away_team_correct', 'winner_correct', 'points',
            ])
            affected_users.add(kp.user_id)

    for user_id in affected_users:
        _recalculate_user_score(user_id)


def score_knockout_teams(match):
    """Score home/away team-slot correctness for a knockout match as soon as its
    teams are confirmed by feeder results — without waiting for the match itself
    to be played.

    ``winner_correct`` and the champion bonus stay the responsibility of
    ``score_match_predictions`` when the match finishes, so they're left
    untouched here.

    Idempotent: points are recomputed from whatever teams are currently known,
    so calling this again when the second slot fills (or again after the match
    finishes) never double-counts.
    """
    if match.round not in KNOCKOUT_TEAM_POINTS:
        return
    if not match.home_team_id and not match.away_team_id:
        return

    team_pts = KNOCKOUT_TEAM_POINTS[match.round]
    affected_users = set()

    for kp in KnockoutPrediction.objects.filter(match=match):
        points = 0
        if match.home_team_id:
            kp.home_team_correct = kp.predicted_home_team_id == match.home_team_id
            if kp.home_team_correct:
                points += team_pts
        if match.away_team_id:
            kp.away_team_correct = kp.predicted_away_team_id == match.away_team_id
            if kp.away_team_correct:
                points += team_pts
        # winner_correct is scored later when the match finishes; preserve any
        # existing value (and its champion bonus) instead of clearing it here.
        if kp.winner_correct and match.round == Match.RoundChoices.F:
            points += CHAMPION_POINTS
        kp.points = points
        kp.save(update_fields=['home_team_correct', 'away_team_correct', 'points'])
        affected_users.add(kp.user_id)

    from accounts.models import User
    for user_id in affected_users:
        _recalculate_user_score(user_id)
        total = (
            (MatchPrediction.objects.filter(user_id=user_id).aggregate(t=Sum('points'))['t'] or 0) +
            (KnockoutPrediction.objects.filter(user_id=user_id).aggregate(t=Sum('points'))['t'] or 0) +
            (TopScorerPrediction.objects.filter(user_id=user_id).aggregate(t=Sum('points'))['t'] or 0) +
            (GroupPrediction.objects.filter(user_id=user_id).aggregate(t=Sum('points'))['t'] or 0) +
            (TopTeamPrediction.objects.filter(user_id=user_id).aggregate(t=Sum('points'))['t'] or 0)
        )
        User.objects.filter(pk=user_id).update(points=total)


def score_match_predictions(match):
    """Score all predictions for a finished match. Call this after saving results via QuerySet.update()."""
    if not match.is_finished:
        return

    affected_users = set()

    actual_outcome = get_outcome(match.score_home_team, match.score_away_team)

    for mp in MatchPrediction.objects.filter(match=match):
        mp.correct_outcome = mp.outcome == actual_outcome
        mp.correct_home_team_score = mp.home_team_score == match.score_home_team
        mp.correct_away_team_score = mp.away_team_score == match.score_away_team

        points = 2 if mp.correct_outcome else 0
        if mp.correct_home_team_score and mp.correct_away_team_score:
            points += 5
        elif mp.correct_home_team_score or mp.correct_away_team_score:
            points += 1
        mp.points = points

        mp.save(update_fields=['correct_outcome', 'correct_home_team_score', 'correct_away_team_score', 'points'])
        affected_users.add(mp.user_id)

    if match.round in KNOCKOUT_TEAM_POINTS:
        team_pts = KNOCKOUT_TEAM_POINTS[match.round]

        actual_winner_id = None
        if match.score_home_team is not None and match.score_away_team is not None:
            if match.score_home_team > match.score_away_team:
                actual_winner_id = match.home_team_id
            elif match.score_away_team > match.score_home_team:
                actual_winner_id = match.away_team_id
            elif match.home_penalties is not None and match.away_penalties is not None:
                actual_winner_id = (
                    match.home_team_id if match.home_penalties > match.away_penalties
                    else match.away_team_id
                )

        for kp in KnockoutPrediction.objects.filter(match=match):
            points = 0
            if match.home_team_id:
                kp.home_team_correct = kp.predicted_home_team_id == match.home_team_id
                if kp.home_team_correct:
                    points += team_pts
            if match.away_team_id:
                kp.away_team_correct = kp.predicted_away_team_id == match.away_team_id
                if kp.away_team_correct:
                    points += team_pts
            if actual_winner_id is not None:
                kp.winner_correct = kp.predicted_winner_id == actual_winner_id
                if kp.winner_correct and match.round == Match.RoundChoices.F:
                    points += CHAMPION_POINTS
            kp.points = points
            kp.save(update_fields=['home_team_correct', 'away_team_correct', 'winner_correct', 'points'])
            affected_users.add(kp.user_id)

    if match.round == Match.RoundChoices.F:
        affected_users |= _score_top_scorer_predictions()
        affected_users |= _score_top_team_predictions()

    from accounts.models import User
    for user_id in affected_users:
        _recalculate_user_score(user_id)
        total = (
            (MatchPrediction.objects.filter(user_id=user_id).aggregate(t=Sum('points'))['t'] or 0) +
            (KnockoutPrediction.objects.filter(user_id=user_id).aggregate(t=Sum('points'))['t'] or 0) +
            (TopScorerPrediction.objects.filter(user_id=user_id).aggregate(t=Sum('points'))['t'] or 0) +
            (GroupPrediction.objects.filter(user_id=user_id).aggregate(t=Sum('points'))['t'] or 0) +
            (TopTeamPrediction.objects.filter(user_id=user_id).aggregate(t=Sum('points'))['t'] or 0)
        )
        User.objects.filter(pk=user_id).update(points=total)
