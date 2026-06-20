from itertools import groupby

from rest_framework import serializers
from groups.models import Group
from teams.serializers import TeamSerializer


def _head_to_head_stats(team_ids, matches):
    """Mini-table (points / GF / GA) using only matches between the given teams."""
    team_ids = set(team_ids)
    stats = {tid: {'points': 0, 'goalsFor': 0, 'goalsAgainst': 0} for tid in team_ids}

    for match in matches:
        home_id, away_id = match.home_team_id, match.away_team_id
        if home_id not in team_ids or away_id not in team_ids:
            continue

        home_goals, away_goals = match.score_home_team, match.score_away_team
        stats[home_id]['goalsFor'] += home_goals
        stats[home_id]['goalsAgainst'] += away_goals
        stats[away_id]['goalsFor'] += away_goals
        stats[away_id]['goalsAgainst'] += home_goals

        if home_goals > away_goals:
            stats[home_id]['points'] += 3
        elif home_goals < away_goals:
            stats[away_id]['points'] += 3
        else:
            stats[home_id]['points'] += 1
            stats[away_id]['points'] += 1

    return stats


def _break_tie(team_ids, matches, overall):
    """
    Order teams that are level on overall points, applying the FIFA criteria.

    Step one: head-to-head points, goal difference, goals scored among the
    teams still concerned. If that separates only part of the group, the
    criteria are re-applied from the top to each subset still level.

    Step two: overall goal difference, then overall goals scored. If teams are
    still level after that, fall back to alphabetical order by team name (a
    deterministic placeholder for FIFA's fair-play / drawing-of-lots criteria,
    to be resolved manually if it ever decides a real ranking).
    """
    if len(team_ids) <= 1:
        return list(team_ids)

    h2h = _head_to_head_stats(team_ids, matches)

    def step_one_key(tid):
        s = h2h[tid]
        return (s['points'], s['goalsFor'] - s['goalsAgainst'], s['goalsFor'])

    ordered = sorted(team_ids, key=step_one_key, reverse=True)
    clusters = [list(g) for _, g in groupby(ordered, key=step_one_key)]

    # Step one produced no separation at all -> fall back to step two.
    if len(clusters) == 1:
        # Stable sort: name ascending first, then the descending stat keys, so
        # name only matters when goal difference and goals scored are equal.
        ranked = sorted(team_ids, key=lambda tid: overall[tid]['name'])
        ranked.sort(
            key=lambda tid: (
                overall[tid]['goalsFor'] - overall[tid]['goalsAgainst'],
                overall[tid]['goalsFor'],
            ),
            reverse=True,
        )
        return ranked

    # Re-apply the criteria from the top to each still-tied subset.
    result = []
    for cluster in clusters:
        result.extend(_break_tie(cluster, matches, overall))
    return result


class GroupSerializer(serializers.ModelSerializer):
    teams = serializers.SerializerMethodField()

    class Meta:
        model = Group
        fields = ['id', 'name', 'next_p1', 'slot_p1', 'next_p2', 'slot_p2', 'next_p3', 'slot_p3', 'teams']

    def get_teams(self, group):
        finished_matches = list(
            group.matches.filter(is_finished=True).select_related('home_team', 'away_team')
        )

        standings = {}
        for team in group.teams.all().distinct():
            team_data = TeamSerializer(team, context=self.context).data
            standings[team.id] = {
                **team_data,
                'wins': 0,
                'draws': 0,
                'losses': 0,
                'played': 0,
                'goalsFor': 0,
                'goalsAgainst': 0,
                'points': 0,
            }

        for match in finished_matches:
            home_id = match.home_team_id
            away_id = match.away_team_id
            home_goals = match.score_home_team
            away_goals = match.score_away_team

            if home_id not in standings or away_id not in standings:
                continue

            standings[home_id]['played'] += 1
            standings[away_id]['played'] += 1
            standings[home_id]['goalsFor'] += home_goals
            standings[home_id]['goalsAgainst'] += away_goals
            standings[away_id]['goalsFor'] += away_goals
            standings[away_id]['goalsAgainst'] += home_goals

            if home_goals > away_goals:
                standings[home_id]['wins'] += 1
                standings[home_id]['points'] += 3
                standings[away_id]['losses'] += 1
            elif home_goals < away_goals:
                standings[away_id]['wins'] += 1
                standings[away_id]['points'] += 3
                standings[home_id]['losses'] += 1
            else:
                standings[home_id]['draws'] += 1
                standings[home_id]['points'] += 1
                standings[away_id]['draws'] += 1
                standings[away_id]['points'] += 1

        # Primary ranking is overall points; teams level on points are split
        # by the FIFA tie-breaking criteria (head-to-head first, then overall).
        ranked_ids = []
        by_points = sorted(standings, key=lambda tid: standings[tid]['points'], reverse=True)
        for _, group_iter in groupby(by_points, key=lambda tid: standings[tid]['points']):
            tied = list(group_iter)
            ranked_ids.extend(_break_tie(tied, finished_matches, standings))

        return [standings[tid] for tid in ranked_ids]
