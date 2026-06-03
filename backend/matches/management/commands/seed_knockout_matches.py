from django.core.management.base import BaseCommand
from datetime import datetime, timezone
from matches.models import Match


def dt(s):
    return datetime.strptime(s, '%Y-%m-%d %H:%M:%S').replace(tzinfo=timezone.utc)


BRACKET = [

    # ── Round of 32 ───────────────────────────────────────────────────────────────
    {"id": 73,  "round": "R32", "home": "2A",            "away": "2B",            "stadium": "SoFi Stadium",            "location": "Los Angeles",         "date": "2026-06-28 19:00:00", "next": 90,   "slot": "home"},
    {"id": 76,  "round": "R32", "home": "1C",            "away": "2F",            "stadium": "NRG Stadium",             "location": "Houston",             "date": "2026-06-29 17:00:00", "next": 90,   "slot": "away"},
    {"id": 74,  "round": "R32", "home": "1E",            "away": "3A/B/C/D/F",    "stadium": "Gillette Stadium",        "location": "Boston",              "date": "2026-06-29 20:30:00", "next": 89,   "slot": "home"},
    {"id": 75,  "round": "R32", "home": "1F",            "away": "2C",            "stadium": "Estadio BBVA",            "location": "Monterrey",           "date": "2026-06-30 01:00:00", "next": 89,   "slot": "away"},
    {"id": 78,  "round": "R32", "home": "2E",            "away": "2I",            "stadium": "AT&T Stadium",            "location": "Dallas",              "date": "2026-06-30 17:00:00", "next": 91,   "slot": "home"},
    {"id": 77,  "round": "R32", "home": "1I",            "away": "3C/D/F/G/H",    "stadium": "MetLife Stadium",         "location": "New York/New Jersey", "date": "2026-06-30 21:00:00", "next": 91,   "slot": "away"},
    {"id": 79,  "round": "R32", "home": "1A",            "away": "3C/E/F/H/I",    "stadium": "Estadio Azteca",          "location": "Mexico City",         "date": "2026-07-01 01:00:00", "next": 92,   "slot": "home"},
    {"id": 80,  "round": "R32", "home": "1L",            "away": "3E/H/I/J/K",    "stadium": "Mercedes-Benz Stadium",   "location": "Atlanta",             "date": "2026-07-01 16:00:00", "next": 92,   "slot": "away"},
    {"id": 82,  "round": "R32", "home": "1G",            "away": "3A/E/H/I/J",    "stadium": "Lumen Field",             "location": "Seattle",             "date": "2026-07-01 20:00:00", "next": 93,   "slot": "home"},
    {"id": 81,  "round": "R32", "home": "1D",            "away": "3B/E/F/I/J",    "stadium": "Levi's Stadium",          "location": "San Francisco",       "date": "2026-07-02 00:00:00", "next": 93,   "slot": "away"},
    {"id": 84,  "round": "R32", "home": "1H",            "away": "2J",            "stadium": "SoFi Stadium",            "location": "Los Angeles",         "date": "2026-07-02 19:00:00", "next": 94,   "slot": "home"},
    {"id": 83,  "round": "R32", "home": "2K",            "away": "2L",            "stadium": "BMO Field",               "location": "Toronto",             "date": "2026-07-02 23:00:00", "next": 94,   "slot": "away"},
    {"id": 85,  "round": "R32", "home": "1B",            "away": "3E/F/G/I/J",    "stadium": "BC Place",                "location": "Vancouver",           "date": "2026-07-03 03:00:00", "next": 95,   "slot": "home"},
    {"id": 88,  "round": "R32", "home": "2D",            "away": "2G",            "stadium": "AT&T Stadium",            "location": "Dallas",              "date": "2026-07-03 18:00:00", "next": 95,   "slot": "away"},
    {"id": 86,  "round": "R32", "home": "1J",            "away": "2H",            "stadium": "Hard Rock Stadium",       "location": "Miami",               "date": "2026-07-03 22:00:00", "next": 96,   "slot": "home"},
    {"id": 87,  "round": "R32", "home": "1K",            "away": "3D/E/I/J/L",    "stadium": "Arrowhead Stadium",       "location": "Kansas City",         "date": "2026-07-04 01:30:00", "next": 96,   "slot": "away"},

    # ── Round of 16 ───────────────────────────────────────────────────────────────
    {"id": 90,  "round": "R16", "home": "WINNER 73",     "away": "WINNER 76",     "stadium": "AT&T Stadium",            "location": "Houston",              "date": "2026-07-04 17:00:00", "next": 97,   "slot": "home"},
    {"id": 89,  "round": "R16", "home": "WINNER 74",     "away": "WINNER 75",     "stadium": "Lincoln Financial Field", "location": "Philadelphia",         "date": "2026-07-04 21:00:00", "next": 97,   "slot": "away"},
    {"id": 91,  "round": "R16", "home": "WINNER 78",     "away": "WINNER 77",     "stadium": "MetLife Stadium",         "location": "New York/New Jersey",  "date": "2026-07-05 20:00:00", "next": 98,   "slot": "home"},
    {"id": 92,  "round": "R16", "home": "WINNER 79",     "away": "WINNER 80",     "stadium": "Estadio Azteca",          "location": "Mexico City",          "date": "2026-07-06 00:00:00", "next": 98,   "slot": "away"},
    {"id": 93,  "round": "R16", "home": "WINNER 82",     "away": "WINNER 81",     "stadium": "AT&T Stadium",            "location": "Dallas",               "date": "2026-07-06 19:00:00", "next": 99,   "slot": "home"},
    {"id": 94,  "round": "R16", "home": "WINNER 84",     "away": "WINNER 83",     "stadium": "Lumen Field",             "location": "Seattle",              "date": "2026-07-07 00:00:00", "next": 99,   "slot": "away"},
    {"id": 95,  "round": "R16", "home": "WINNER 85",     "away": "WINNER 88",     "stadium": "Mercedes-Benz Stadium",   "location": "Atlanta",              "date": "2026-07-07 16:00:00", "next": 100,  "slot": "home"},
    {"id": 96,  "round": "R16", "home": "WINNER 86",     "away": "WINNER 87",     "stadium": "BC Place",                "location": "Vancouver",            "date": "2026-07-07 20:00:00", "next": 100,  "slot": "away"},

    # ── Quarter Finals ────────────────────────────────────────────────────────────
    {"id": 97,  "round": "QF",  "home": "WINNER 89",     "away": "WINNER 90",     "stadium": "Gillette Stadium",        "location": "Boston",              "date": "2026-07-09 20:00:00", "next": 101,  "slot": "home"},
    {"id": 98,  "round": "QF",  "home": "WINNER 91",     "away": "WINNER 92",     "stadium": "SoFi Stadium",            "location": "Los Angeles",         "date": "2026-07-10 19:00:00", "next": 101,  "slot": "away"},
    {"id": 99,  "round": "QF",  "home": "WINNER 93",     "away": "WINNER 94",     "stadium": "Hard Rock Stadium",       "location": "Miami",               "date": "2026-07-11 21:00:00", "next": 102,  "slot": "home"},
    {"id": 100, "round": "QF",  "home": "WINNER 95",     "away": "WINNER 96",     "stadium": "Arrowhead Stadium",       "location": "Kansas",              "date": "2026-07-12 01:00:00", "next": 102,  "slot": "away"},

    # ── Semi Finals ───────────────────────────────────────────────────────────────
    {"id": 101, "round": "SF",  "home": "WINNER 97",     "away": "WINNER 98",     "stadium": "AT&T Stadium",            "location": "Dallas",              "date": "2026-07-14 19:00:00", "next": 103,  "slot": "home"},
    {"id": 102, "round": "SF",  "home": "WINNER 99",     "away": "WINNER 100",    "stadium": "Mercedes-Benz Stadium",   "location": "Atlanta",             "date": "2026-07-15 19:00:00", "next": 103,  "slot": "away"},

    # ── Final ─────────────────────────────────────────────────────────────────────
    {"id": 103, "round": "F",   "home": "WINNER 101",    "away": "WINNER 102",    "stadium": "Hard Rock Stadium",       "location": "Miami",                "date": "2026-07-18 21:00:00", "next": None, "slot": None},
    {"id": 104, "round": "F",   "home": "LOSER 101",     "away": "LOSER 102",     "stadium": "MetLife Stadium",         "location": "New York/New Jersey",  "date": "2026-07-19 19:00:00", "next": None, "slot": None},
]

ROUND_DISPLAY = {
    'F': 'Final', 'SF': 'Semi Final', 'QF': 'Quarter Final',
    'R16': 'Round of 16', 'R32': 'Round of 32',
}


class Command(BaseCommand):
    help = 'Seed knockout phase matches with bracket links'

    def handle(self, *args, **kwargs):
        # Pass 1: create all matches
        for data in BRACKET:
            match, created = Match.objects.get_or_create(
                round=data['round'],
                home_placeholder=data['home'],
                away_placeholder=data['away'],
                defaults={
                    'match_id': data['id'],
                    'stadium': data['stadium'],
                    'location': data['location'],
                    'date': dt(data['date']),
                },
            )
            status = 'created' if created else 'already exists'
            self.stdout.write(f'[{ROUND_DISPLAY[data["round"]]}] {data["home"]} vs {data["away"]} — {status}')

        # Pass 2: wire up bracket links via match_id
        for data in BRACKET:
            if data['next'] is None:
                continue

            match = Match.objects.get(match_id=data['id'])
            next_match = Match.objects.get(match_id=data['next'])

            Match.objects.filter(pk=match.pk).update(
                next_match=next_match,
                next_match_slot=data['slot'],
            )

        self.stdout.write(self.style.SUCCESS(f'\nDone — {len(BRACKET)} matches seeded with bracket links.'))
