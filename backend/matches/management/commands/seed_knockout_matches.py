from django.core.management.base import BaseCommand
from datetime import datetime
from zoneinfo import ZoneInfo
from matches.models import Match

EASTERN = ZoneInfo('America/New_York')


def dt(s):
    return datetime.strptime(s, '%Y-%m-%d %H:%M:%S').replace(tzinfo=EASTERN)


# Bracket definition: (local_id, round, home_placeholder, away_placeholder, stadium, location, date, next_local_id, next_slot)
#
# Placeholder naming:
#   1X  = winner of group X
#   2X  = runner-up of group X
#   3rd-N = Nth best third-place team
#   WINNER<id> = winner of the match with the given local_id
#
# NOTE: Adjust matchups, venues, and dates to match the official FIFA 2026 bracket once published.
BRACKET = [
    # ── Final ─────────────────────────────────────────────────────────────────────
    ('f1',     'F',   'WINNER SF1',    'WINNER SF2',    'MetLife Stadium',         'New York/New Jersey', '2026-07-26 18:00:00', None,     None   ),
    ('f2',     'F',   'LOSER SF1',    'LOSER SF2',    'MetLife Stadium',         'New York/New Jersey', '2026-07-26 18:00:00', None,     None   ),

    # ── Semi Finals ───────────────────────────────────────────────────────────────
    ('sf1',    'SF',  'WINNER QF1',    'WINNER QF2',    'AT&T Stadium',            'Dallas',              '2026-07-21 18:00:00', 'f1',    'home' ),
    ('sf2',    'SF',  'WINNER QF3',    'WINNER QF4',    'MetLife Stadium',         'New York/New Jersey', '2026-07-22 18:00:00', 'f1',    'away' ),

    # ── Quarter Finals ────────────────────────────────────────────────────────────
    ('qf1',    'QF',  'WINNER R16_1',  'WINNER R16_2',  'SoFi Stadium',            'Los Angeles',         '2026-07-16 18:00:00', 'sf1',   'home' ),
    ('qf2',    'QF',  'WINNER R16_3',  'WINNER R16_4',  'NRG Stadium',             'Houston',             '2026-07-16 21:00:00', 'sf1',   'away' ),
    ('qf3',    'QF',  'WINNER R16_5',  'WINNER R16_6',  'Hard Rock Stadium',       'Miami',               '2026-07-17 18:00:00', 'sf2',   'home' ),
    ('qf4',    'QF',  'WINNER R16_7',  'WINNER R16_8',  'BC Place',                'Vancouver',           '2026-07-17 21:00:00', 'sf2',   'away' ),

    # ── Round of 16 ───────────────────────────────────────────────────────────────
    ('r16_1',  'R16', 'WINNER R32_1',  'WINNER R32_2',  'AT&T Stadium',            'Dallas',              '2026-07-09 18:00:00', 'qf1',   'home' ),
    ('r16_2',  'R16', 'WINNER R32_3',  'WINNER R32_4',  "Levi's Stadium",          'San Francisco',       '2026-07-09 21:00:00', 'qf1',   'away' ),
    ('r16_3',  'R16', 'WINNER R32_5',  'WINNER R32_6',  'Lincoln Financial Field', 'Philadelphia',        '2026-07-10 18:00:00', 'qf2',   'home' ),
    ('r16_4',  'R16', 'WINNER R32_7',  'WINNER R32_8',  'Estadio Azteca',          'Mexico City',         '2026-07-10 21:00:00', 'qf2',   'away' ),
    ('r16_5',  'R16', 'WINNER R32_9',  'WINNER R32_10', 'MetLife Stadium',         'New York/New Jersey', '2026-07-11 18:00:00', 'qf3',   'home' ),
    ('r16_6',  'R16', 'WINNER R32_11', 'WINNER R32_12', 'SoFi Stadium',            'Los Angeles',         '2026-07-11 21:00:00', 'qf3',   'away' ),
    ('r16_7',  'R16', 'WINNER R32_13', 'WINNER R32_14', 'Arrowhead Stadium',       'Kansas City',         '2026-07-12 18:00:00', 'qf4',   'home' ),
    ('r16_8',  'R16', 'WINNER R32_15', 'WINNER R32_16', 'Lumen Field',             'Seattle',             '2026-07-12 21:00:00', 'qf4',   'away' ),

    # ── Round of 32 ───────────────────────────────────────────────────────────────
    # Group winners vs runners-up from different groups (adjust to official FIFA bracket)
    # 3rd-1 through 3rd-8 = the 8 best third-place teams (seeded after group stage)
    ('r32_1',  'R32', '1A',    '2B',    'MetLife Stadium',         'New York/New Jersey', '2026-07-01 18:00:00', 'r16_1', 'home' ),
    ('r32_2',  'R32', '1C',    '2D',    'AT&T Stadium',            'Dallas',              '2026-07-01 21:00:00', 'r16_1', 'away' ),
    ('r32_3',  'R32', '1B',    '2C',    'SoFi Stadium',            'Los Angeles',         '2026-07-02 18:00:00', 'r16_2', 'home' ),
    ('r32_4',  'R32', '1D',    '2A',    'Hard Rock Stadium',       'Miami',               '2026-07-02 21:00:00', 'r16_2', 'away' ),
    ('r32_5',  'R32', '1E',    '2F',    'NRG Stadium',             'Houston',             '2026-07-03 18:00:00', 'r16_3', 'home' ),
    ('r32_6',  'R32', '1G',    '2H',    "Levi's Stadium",          'San Francisco',       '2026-07-03 21:00:00', 'r16_3', 'away' ),
    ('r32_7',  'R32', '1F',    '2G',    'Lincoln Financial Field', 'Philadelphia',        '2026-07-04 18:00:00', 'r16_4', 'home' ),
    ('r32_8',  'R32', '1H',    '2E',    'Lumen Field',             'Seattle',             '2026-07-04 21:00:00', 'r16_4', 'away' ),
    ('r32_9',  'R32', '1I',    '2J',    'Arrowhead Stadium',       'Kansas City',         '2026-07-05 18:00:00', 'r16_5', 'home' ),
    ('r32_10', 'R32', '1K',    '2L',    'BC Place',                'Vancouver',           '2026-07-05 21:00:00', 'r16_5', 'away' ),
    ('r32_11', 'R32', '1J',    '2K',    'Estadio Azteca',          'Mexico City',         '2026-07-06 18:00:00', 'r16_6', 'home' ),
    ('r32_12', 'R32', '1L',    '2I',    'Estadio Akron',           'Guadalajara',         '2026-07-06 21:00:00', 'r16_6', 'away' ),
    ('r32_13', 'R32', '3rd-1', '3rd-2', 'BMO Field',               'Toronto',             '2026-07-07 18:00:00', 'r16_7', 'home' ),
    ('r32_14', 'R32', '3rd-3', '3rd-4', 'Mercedes-Benz Stadium',   'Atlanta',             '2026-07-07 21:00:00', 'r16_7', 'away' ),
    ('r32_15', 'R32', '3rd-5', '3rd-6', 'Gillette Stadium',        'Boston',              '2026-07-08 18:00:00', 'r16_8', 'home' ),
    ('r32_16', 'R32', '3rd-7', '3rd-8', 'Estadio BBVA',            'Monterrey',           '2026-07-08 21:00:00', 'r16_8', 'away' ),
]

ROUND_DISPLAY = {
    'F': 'Final', 'SF': 'Semi Final', 'QF': 'Quarter Final',
    'R16': 'Round of 16', 'R32': 'Round of 32',
}


class Command(BaseCommand):
    help = 'Seed knockout phase matches with bracket links'

    def handle(self, *args, **kwargs):
        created_matches = {}

        # Pass 1: create all matches
        for row in BRACKET:
            local_id, round_code, home_ph, away_ph, stadium, location, date_str, _, _ = row

            match, created = Match.objects.get_or_create(
                round=round_code,
                home_placeholder=home_ph,
                away_placeholder=away_ph,
                defaults={
                    'stadium': stadium,
                    'location': location,
                    'date': dt(date_str),
                },
            )
            created_matches[local_id] = match
            status = 'created' if created else 'already exists'
            self.stdout.write(f'[{ROUND_DISPLAY[round_code]}] {home_ph} vs {away_ph} — {status}')

        # Pass 2: wire up bracket links
        for row in BRACKET:
            local_id, _, _, _, _, _, _, next_local_id, next_slot = row
            if next_local_id is None:
                continue

            match = created_matches[local_id]
            next_match = created_matches[next_local_id]

            Match.objects.filter(pk=match.pk).update(
                next_match=next_match,
                next_match_slot=next_slot,
            )

        self.stdout.write(self.style.SUCCESS(f'\nDone — {len(created_matches)} matches seeded with bracket links.'))
