from types import SimpleNamespace

from django.test import TestCase
from django.utils import timezone

from groups.models import Group
from groups.serializers import GroupSerializer, _break_tie, _head_to_head_stats
from matches.models import Match
from teams.models import Team


def _match(home, away, home_goals, away_goals):
    """Lightweight stand-in for a Match row (only the fields the helpers read)."""
    return SimpleNamespace(
        home_team_id=home,
        away_team_id=away,
        score_home_team=home_goals,
        score_away_team=away_goals,
    )


def _overall(**teams):
    """Build the `overall` standings dict from name=(gf, ga) kwargs keyed by id."""
    return {
        tid: {'name': name, 'goalsFor': gf, 'goalsAgainst': ga}
        for tid, (name, gf, ga) in teams.items()
    }


class TieBreakHelperTests(TestCase):
    def test_head_to_head_ignores_matches_outside_the_tied_set(self):
        matches = [
            _match(1, 2, 2, 0),   # counted
            _match(1, 3, 5, 0),   # team 3 not in the tied set -> ignored
        ]
        stats = _head_to_head_stats([1, 2], matches)

        self.assertEqual(stats[1], {'points': 3, 'goalsFor': 2, 'goalsAgainst': 0})
        self.assertEqual(stats[2], {'points': 0, 'goalsFor': 0, 'goalsAgainst': 2})

    def test_step_one_points_break_two_way_tie(self):
        matches = [_match(1, 2, 1, 0)]  # team 1 beat team 2
        overall = _overall(**{1: ('A', 1, 0), 2: ('B', 0, 1)})

        self.assertEqual(_break_tie([1, 2], matches, overall), [1, 2])

    def test_step_one_goal_difference_breaks_tie_when_h2h_points_equal(self):
        # Two meetings, one win each -> equal h2h points, team 1 has better h2h GD.
        matches = [_match(1, 2, 3, 0), _match(2, 1, 1, 0)]
        overall = _overall(**{1: ('A', 3, 1), 2: ('B', 1, 3)})

        self.assertEqual(_break_tie([1, 2], matches, overall), [1, 2])

    def test_partial_separation_reapplies_criteria_to_still_tied_subset(self):
        # Team 1 beats 2 and 3; teams 2 and 3 draw -> step one isolates team 1,
        # then teams 2 & 3 (identical head-to-head) fall to overall goal difference.
        matches = [
            _match(1, 2, 1, 0),
            _match(1, 3, 1, 0),
            _match(2, 3, 0, 0),
        ]
        # Team 2 has the better overall GD; names are set opposite to prove GD wins.
        overall = _overall(**{
            1: ('Ateam', 2, 0),
            2: ('Zteam', 5, 0),
            3: ('Bteam', 1, 1),
        })

        self.assertEqual(_break_tie([1, 2, 3], matches, overall), [1, 2, 3])

    def test_alphabetical_is_the_final_fallback(self):
        # Everyone draws everyone -> identical h2h and overall stats -> name order.
        matches = [_match(1, 2, 0, 0), _match(1, 3, 0, 0), _match(2, 3, 0, 0)]
        overall = _overall(**{
            1: ('Charlie', 0, 0),
            2: ('Alpha', 0, 0),
            3: ('Bravo', 0, 0),
        })

        self.assertEqual(_break_tie([1, 2, 3], matches, overall), [2, 3, 1])


class GroupSerializerStandingsTests(TestCase):
    def _make_match(self, group, home, away, home_goals, away_goals):
        return Match.objects.create(
            home_team=home,
            away_team=away,
            score_home_team=home_goals,
            score_away_team=away_goals,
            round=Match.RoundChoices.GS,
            group=group,
            stadium='Stadium',
            location='City',
            date=timezone.now(),
            is_finished=True,
        )

    def test_three_way_tie_resolved_by_head_to_head_goal_difference(self):
        group = Group.objects.create(name='A', next_p1=0, next_p2=0, next_p3=[])
        alpha = Team.objects.create(name='Alpha', short_name='ALP')
        bravo = Team.objects.create(name='Bravo', short_name='BRA')
        charlie = Team.objects.create(name='Charlie', short_name='CHA')
        group.teams.add(alpha, bravo, charlie)

        # Cyclic result: all level on 3 points, split by head-to-head goal diff.
        self._make_match(group, alpha, bravo, 1, 0)   # Alpha GD 0, Bravo GD +3
        self._make_match(group, bravo, charlie, 4, 0)
        self._make_match(group, charlie, alpha, 1, 0)  # Charlie GD -3

        standings = GroupSerializer().get_teams(group)
        order = [team['name'] for team in standings]

        self.assertEqual(order, ['Bravo', 'Alpha', 'Charlie'])
        self.assertTrue(all(team['points'] == 3 for team in standings))
