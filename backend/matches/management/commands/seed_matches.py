from django.core.management.base import BaseCommand
from datetime import datetime, timezone
from matches.models import Match
from groups.models import Group
from teams.models import Team

# All dates are UTC (GMT+0)
MATCHES = [
  {"id": 1,  "home": "Mexico",       "away": "South Africa", "group": "A", "stadium": "Estadio Azteca",          "location": "Mexico City",         "date": "2026-06-11 19:00:00"},
  {"id": 2,  "home": "South Korea",  "away": "Czechia",      "group": "A", "stadium": "Estadio Akron",           "location": "Guadalajara",         "date": "2026-06-12 02:00:00"},
  {"id": 3,  "home": "Canada",       "away": "Bosnia",       "group": "B", "stadium": "BMO Field",               "location": "Toronto",             "date": "2026-06-12 19:00:00"},
  {"id": 4,  "home": "United States","away": "Paraguay",     "group": "D", "stadium": "SoFi Stadium",            "location": "Los Angeles",         "date": "2026-06-13 01:00:00"},
  {"id": 5,  "home": "Qatar",        "away": "Switzerland",  "group": "B", "stadium": "Levi's Stadium",          "location": "San Francisco",       "date": "2026-06-13 19:00:00"},
  {"id": 6,  "home": "Brazil",       "away": "Morocco",      "group": "C", "stadium": "MetLife Stadium",         "location": "New York/New Jersey", "date": "2026-06-13 22:00:00"},
  {"id": 7,  "home": "Haiti",        "away": "Scotland",     "group": "C", "stadium": "Gillette Stadium",        "location": "Boston",              "date": "2026-06-14 01:00:00"},
  {"id": 8,  "home": "Australia",    "away": "Turkey",       "group": "D", "stadium": "BC Place",                "location": "Vancouver",           "date": "2026-06-14 04:00:00"},
  {"id": 9,  "home": "Germany",      "away": "Curaçao",      "group": "E", "stadium": "NRG Stadium",             "location": "Houston",             "date": "2026-06-14 17:00:00"},
  {"id": 10, "home": "Netherlands",  "away": "Japan",        "group": "F", "stadium": "AT&T Stadium",            "location": "Dallas",              "date": "2026-06-14 20:00:00"},
  {"id": 11, "home": "Ivory Coast",  "away": "Ecuador",      "group": "E", "stadium": "Lincoln Financial Field", "location": "Philadelphia",        "date": "2026-06-14 23:00:00"},
  {"id": 12, "home": "Sweden",       "away": "Tunisia",      "group": "F", "stadium": "Estadio BBVA",            "location": "Monterrey",           "date": "2026-06-15 02:00:00"},
  {"id": 13, "home": "Spain",        "away": "Cabo Verde",   "group": "H", "stadium": "Mercedes-Benz Stadium",   "location": "Atlanta",             "date": "2026-06-15 16:00:00"},
  {"id": 14, "home": "Belgium",      "away": "Egypt",        "group": "G", "stadium": "Lumen Field",             "location": "Seattle",             "date": "2026-06-15 19:00:00"},
  {"id": 15, "home": "Saudi Arabia", "away": "Uruguay",      "group": "H", "stadium": "Hard Rock Stadium",       "location": "Miami",               "date": "2026-06-15 22:00:00"},
  {"id": 16, "home": "Iran",         "away": "New Zealand",  "group": "G", "stadium": "SoFi Stadium",            "location": "Los Angeles",         "date": "2026-06-16 01:00:00"},
  {"id": 17, "home": "France",       "away": "Senegal",      "group": "I", "stadium": "MetLife Stadium",         "location": "New York/New Jersey", "date": "2026-06-16 19:00:00"},
  {"id": 18, "home": "Iraq",         "away": "Norway",       "group": "I", "stadium": "Gillette Stadium",        "location": "Boston",              "date": "2026-06-16 22:00:00"},
  {"id": 19, "home": "Argentina",    "away": "Algeria",      "group": "J", "stadium": "Arrowhead Stadium",       "location": "Kansas City",         "date": "2026-06-17 01:00:00"},
  {"id": 20, "home": "Austria",      "away": "Jordan",       "group": "J", "stadium": "Levi's Stadium",          "location": "San Francisco",       "date": "2026-06-17 04:00:00"},
  {"id": 21, "home": "Portugal",     "away": "DR Congo",     "group": "K", "stadium": "NRG Stadium",             "location": "Houston",             "date": "2026-06-17 17:00:00"},
  {"id": 22, "home": "England",      "away": "Croatia",      "group": "L", "stadium": "AT&T Stadium",            "location": "Dallas",              "date": "2026-06-17 20:00:00"},
  {"id": 23, "home": "Ghana",        "away": "Panama",       "group": "L", "stadium": "BMO Field",               "location": "Toronto",             "date": "2026-06-17 23:00:00"},
  {"id": 24, "home": "Uzbekistan",   "away": "Colombia",     "group": "K", "stadium": "Estadio Azteca",          "location": "Mexico City",         "date": "2026-06-18 02:00:00"},
  {"id": 25, "home": "Czechia",      "away": "South Africa", "group": "A", "stadium": "Mercedes-Benz Stadium",   "location": "Atlanta",             "date": "2026-06-18 16:00:00"},
  {"id": 26, "home": "Switzerland",  "away": "Bosnia",       "group": "B", "stadium": "SoFi Stadium",            "location": "Los Angeles",         "date": "2026-06-18 19:00:00"},
  {"id": 27, "home": "Canada",       "away": "Qatar",        "group": "B", "stadium": "BC Place",                "location": "Vancouver",           "date": "2026-06-18 22:00:00"},
  {"id": 28, "home": "Mexico",       "away": "South Korea",  "group": "A", "stadium": "Estadio Akron",           "location": "Guadalajara",         "date": "2026-06-19 01:00:00"},
  {"id": 29, "home": "Turkey",       "away": "Paraguay",     "group": "D", "stadium": "Levi's Stadium",          "location": "San Francisco",       "date": "2026-06-20 03:00:00"},
  {"id": 30, "home": "Scotland",     "away": "Morocco",      "group": "C", "stadium": "Gillette Stadium",        "location": "Boston",              "date": "2026-06-19 22:00:00"},
  {"id": 31, "home": "Brazil",       "away": "Haiti",        "group": "C", "stadium": "Lincoln Financial Field", "location": "Philadelphia",        "date": "2026-06-20 00:30:00"},
  {"id": 32, "home": "United States","away": "Australia",    "group": "D", "stadium": "Lumen Field",             "location": "Seattle",             "date": "2026-06-19 19:00:00"},
  {"id": 33, "home": "Netherlands",  "away": "Sweden",       "group": "F", "stadium": "NRG Stadium",             "location": "Houston",             "date": "2026-06-20 17:00:00"},
  {"id": 34, "home": "Germany",      "away": "Ivory Coast",  "group": "E", "stadium": "BMO Field",               "location": "Toronto",             "date": "2026-06-20 20:00:00"},
  {"id": 35, "home": "Ecuador",      "away": "Curaçao",      "group": "E", "stadium": "Arrowhead Stadium",       "location": "Kansas City",         "date": "2026-06-21 00:00:00"},
  {"id": 36, "home": "Tunisia",      "away": "Japan",        "group": "F", "stadium": "Estadio BBVA",            "location": "Monterrey",           "date": "2026-06-21 04:00:00"},
  {"id": 37, "home": "Spain",        "away": "Saudi Arabia", "group": "H", "stadium": "Mercedes-Benz Stadium",   "location": "Atlanta",             "date": "2026-06-21 16:00:00"},
  {"id": 38, "home": "Belgium",      "away": "Iran",         "group": "G", "stadium": "SoFi Stadium",            "location": "Los Angeles",         "date": "2026-06-21 19:00:00"},
  {"id": 39, "home": "Uruguay",      "away": "Cabo Verde",   "group": "H", "stadium": "Hard Rock Stadium",       "location": "Miami",               "date": "2026-06-21 22:00:00"},
  {"id": 40, "home": "New Zealand",  "away": "Egypt",        "group": "G", "stadium": "BC Place",                "location": "Vancouver",           "date": "2026-06-22 01:00:00"},
  {"id": 41, "home": "Argentina",    "away": "Austria",      "group": "J", "stadium": "AT&T Stadium",            "location": "Dallas",              "date": "2026-06-22 17:00:00"},
  {"id": 42, "home": "France",       "away": "Iraq",         "group": "I", "stadium": "Lincoln Financial Field", "location": "Philadelphia",        "date": "2026-06-22 20:00:00"},
  {"id": 43, "home": "Norway",       "away": "Senegal",      "group": "I", "stadium": "MetLife Stadium",         "location": "New York/New Jersey", "date": "2026-06-23 00:00:00"},
  {"id": 44, "home": "Jordan",       "away": "Algeria",      "group": "J", "stadium": "Levi's Stadium",          "location": "San Francisco",       "date": "2026-06-23 03:00:00"},
  {"id": 45, "home": "Portugal",     "away": "Uzbekistan",   "group": "K", "stadium": "NRG Stadium",             "location": "Houston",             "date": "2026-06-23 17:00:00"},
  {"id": 46, "home": "England",      "away": "Ghana",        "group": "L", "stadium": "Gillette Stadium",        "location": "Boston",              "date": "2026-06-23 20:00:00"},
  {"id": 47, "home": "Panama",       "away": "Croatia",      "group": "L", "stadium": "BMO Field",               "location": "Toronto",             "date": "2026-06-23 23:00:00"},
  {"id": 48, "home": "Colombia",     "away": "DR Congo",     "group": "K", "stadium": "Estadio Akron",           "location": "Guadalajara",         "date": "2026-06-24 02:00:00"},
  {"id": 49, "home": "Bosnia",       "away": "Qatar",        "group": "B", "stadium": "Lumen Field",             "location": "Seattle",             "date": "2026-06-24 19:00:00"},
  {"id": 50, "home": "Switzerland",  "away": "Canada",       "group": "B", "stadium": "BC Place",                "location": "Vancouver",           "date": "2026-06-24 19:00:00"},
  {"id": 51, "home": "Scotland",     "away": "Brazil",       "group": "C", "stadium": "Hard Rock Stadium",       "location": "Miami",               "date": "2026-06-24 22:00:00"},
  {"id": 52, "home": "Morocco",      "away": "Haiti",        "group": "C", "stadium": "Mercedes-Benz Stadium",   "location": "Atlanta",             "date": "2026-06-24 22:00:00"},
  {"id": 53, "home": "Czechia",      "away": "Mexico",       "group": "A", "stadium": "Estadio Azteca",          "location": "Mexico City",         "date": "2026-06-25 01:00:00"},
  {"id": 54, "home": "South Africa", "away": "South Korea",  "group": "A", "stadium": "Estadio BBVA",            "location": "Monterrey",           "date": "2026-06-25 01:00:00"},
  {"id": 55, "home": "Ecuador",      "away": "Germany",      "group": "E", "stadium": "MetLife Stadium",         "location": "New York/New Jersey", "date": "2026-06-25 20:00:00"},
  {"id": 56, "home": "Curaçao",      "away": "Ivory Coast",  "group": "E", "stadium": "Lincoln Financial Field", "location": "Philadelphia",        "date": "2026-06-25 20:00:00"},
  {"id": 57, "home": "Japan",        "away": "Sweden",       "group": "F", "stadium": "AT&T Stadium",            "location": "Dallas",              "date": "2026-06-25 23:00:00"},
  {"id": 58, "home": "Tunisia",      "away": "Netherlands",  "group": "F", "stadium": "Arrowhead Stadium",       "location": "Kansas City",         "date": "2026-06-25 23:00:00"},
  {"id": 59, "home": "Paraguay",     "away": "Australia",    "group": "D", "stadium": "Levi's Stadium",          "location": "San Francisco",       "date": "2026-06-26 02:00:00"},
  {"id": 60, "home": "Turkey",       "away": "United States","group": "D", "stadium": "SoFi Stadium",            "location": "Los Angeles",         "date": "2026-06-26 02:00:00"},
  {"id": 61, "home": "Norway",       "away": "France",       "group": "I", "stadium": "Gillette Stadium",        "location": "Boston",              "date": "2026-06-26 19:00:00"},
  {"id": 62, "home": "Senegal",      "away": "Iraq",         "group": "I", "stadium": "BMO Field,",              "location": "Toronto",             "date": "2026-06-26 19:00:00"},
  {"id": 63, "home": "Cabo Verde",   "away": "Saudi Arabia", "group": "H", "stadium": "NRG Stadium",             "location": "Houston",             "date": "2026-06-27 00:00:00"},
  {"id": 64, "home": "Uruguay",      "away": "Spain",        "group": "H", "stadium": "Estadio Akron",           "location": "Guadalajara",         "date": "2026-06-27 00:00:00"},
  {"id": 65, "home": "Egypt",        "away": "Iran",         "group": "G", "stadium": "Lumen Field",             "location": "Seattle",             "date": "2026-06-27 03:00:00"},
  {"id": 66, "home": "New Zealand",  "away": "Belgium",      "group": "G", "stadium": "BC Place",                "location": "Vancouver",           "date": "2026-06-27 03:00:00"},
  {"id": 67, "home": "Panama",       "away": "England",      "group": "L", "stadium": "MetLife Stadium",         "location": "New York/New Jersey", "date": "2026-06-27 21:00:00"},
  {"id": 68, "home": "Croatia",      "away": "Ghana",        "group": "L", "stadium": "Lincoln Financial Field", "location": "Philadelphia",        "date": "2026-06-27 21:00:00"},
  {"id": 69, "home": "DR Congo",     "away": "Uzbekistan",   "group": "K", "stadium": "Mercedes-Benz Stadium,",  "location": "Atlanta",             "date": "2026-06-27 23:30:00"},
  {"id": 70, "home": "Colombia",     "away": "Portugal",     "group": "K", "stadium": "Hard Rock Stadium",       "location": "Miami",               "date": "2026-06-27 23:30:00"},
  {"id": 71, "home": "Algeria",      "away": "Austria",      "group": "J", "stadium": "Arrowhead Stadium",       "location": "Kansas City",         "date": "2026-06-28 02:00:00"},
  {"id": 72, "home": "Jordan",       "away": "Argentina",    "group": "J", "stadium": "AT&T Stadium",            "location": "Dallas",              "date": "2026-06-28 02:00:00"},
]


class Command(BaseCommand):
    help = 'Seed group stage matches'

    def handle(self, *args, **kwargs):
        for data in MATCHES:
            group = Group.objects.get(name=data['group'])
            home = Team.objects.get(name=data['home'])
            away = Team.objects.get(name=data['away'])
            date = datetime.strptime(data['date'], '%Y-%m-%d %H:%M:%S').replace(tzinfo=timezone.utc)

            _, created = Match.objects.get_or_create(
                home_team=home,
                away_team=away,
                round=Match.RoundChoices.GS,
                defaults={
                    'match_id': data['id'],
                    'group': group,
                    'stadium': data['stadium'],
                    'location': data['location'],
                    'date': date,
                }
            )
            status = 'created' if created else 'already exists'
            self.stdout.write(f'{home} vs {away} (Group {data["group"]}) — {status}')
