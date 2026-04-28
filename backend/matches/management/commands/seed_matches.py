from django.core.management.base import BaseCommand
from datetime import datetime
from zoneinfo import ZoneInfo
from matches.models import Match
from groups.models import Group
from teams.models import Team

# Each team plays the other 3 in the group once (6 matches per group)

#Eastern Time (ET/EDT)
#Group Stage
MATCHES = [
  {"home": "Mexico", "away": "South Africa", "group": "A", "stadium": "Estadio Azteca", "location": "Mexico City", "date": "2026-06-11 15:00:00", "days_offset": 0},
  {"home": "South Korea", "away": "Czechia", "group": "A", "stadium": "Estadio Akron", "location": "Guadalajara", "date": "2026-06-11 22:00:00", "days_offset": 0},
  {"home": "Canada", "away": "Bosnia and Herzegovina", "group": "B", "stadium": "BMO Field", "location": "Toronto", "date": "2026-06-12 15:00:00", "days_offset": 1},
  {"home": "United States", "away": "Paraguay", "group": "D", "stadium": "SoFi Stadium", "location": "Los Angeles", "date": "2026-06-12 21:00:00", "days_offset": 1},  
  {"home": "Qatar", "away": "Switzerland", "group": "B", "stadium": "Levi's Stadium", "location": "San Francisco", "date": "2026-06-13 15:00:00", "days_offset": 2},
  {"home": "Brazil", "away": "Morocco", "group": "C", "stadium": "MetLife Stadium", "location": "New York/New Jersey", "date": "2026-06-13 18:00:00", "days_offset": 2},
  {"home": "Haiti", "away": "Scotland", "group": "C", "stadium": "Gillette Stadium", "location": "Boston", "date": "2026-06-13 21:00:00", "days_offset": 2},
  {"home": "Australia", "away": "Turkey", "group": "D", "stadium": "BC Place", "location": "Vancouver", "date": "2026-06-14 00:00:00", "days_offset": 3},
  {"home": "Germany", "away": "Curaçao", "group": "E", "stadium": "NRG Stadium", "location": "Houston", "date": "2026-06-14 13:00:00", "days_offset": 3},
  {"home": "Netherlands", "away": "Japan", "group": "F", "stadium": "AT&T Stadium", "location": "Dallas", "date": "2026-06-14 16:00:00", "days_offset": 3},
  {"home": "Ivory Coast", "away": "Ecuador", "group": "E", "stadium": "Lincoln Financial Field", "location": "Philadelphia", "date": "2026-06-14 19:00:00", "days_offset": 3},
  {"home": "Sweden", "away": "Tunisia", "group": "F", "stadium": "Estadio BBVA", "location": "Monterrey", "date": "2026-06-14 22:00:00", "days_offset": 3},
  {"home": "Spain", "away": "Cabo Verde", "group": "H", "stadium": "Mercedes-Benz Stadium", "location": "Atlanta", "date": "2026-06-15 13:00:00", "days_offset": 4},
  {"home": "Belgium", "away": "Egypt", "group": "G", "stadium": "Lumen Field", "location": "Seattle", "date": "2026-06-15 12:00:00", "days_offset": 4},
  {"home": "Saudi Arabia", "away": "Uruguay", "group": "H", "stadium": "Hard Rock Stadium", "location": "Miami", "date": "2026-06-15 18:00:00", "days_offset": 4},
  {"home": "Iran", "away": "New Zealand", "group": "G", "stadium": "SoFi Stadium", "location": "Los Angeles", "date": "2026-06-15 21:00:00", "days_offset": 5},
  {"home": "France", "away": "Senegal", "group": "I", "stadium": "MetLife Stadium", "location": "New York/New Jersey", "date": "2026-06-16 15:00:00", "days_offset": 5},
  {"home": "Iraq", "away": "Norway", "group": "I", "stadium": "Gillette Stadium", "location": "Boston", "date": "2026-06-16 18:00:00", "days_offset": 5},
  {"home": "Argentina", "away": "Algeria", "group": "J", "stadium": "Arrowhead Stadium", "location": "Kansas City", "date": "2026-06-16 21:00:00", "days_offset": 5},
  {"home": "Austria", "away": "Jordan", "group": "J", "stadium": "Levi's Stadium", "location": "San Francisco", "date": "2026-06-17 00:00:00", "days_offset": 6},
  {"home": "Portugal", "away": "DR Congo", "group": "K", "stadium": "NRG Stadium", "location": "Houston", "date": "2026-06-17 13:00:00", "days_offset": 6},
  {"home": "England", "away": "Croatia", "group": "L", "stadium": "AT&T Stadium", "location": "Dallas", "date": "2026-06-17 16:00:00", "days_offset": 6},
  {"home": "Ghana", "away": "Panama", "group": "L", "stadium": "BMO Field", "location": "Toronto", "date": "2026-06-17 19:00:00", "days_offset": 6},
  {"home": "Uzbekistan", "away": "Colombia", "group": "K", "stadium": "Estadio Azteca", "location": "Mexico City", "date": "2026-06-17 22:00:00", "days_offset": 6},
  {"home": "Czechia", "away": "South Africa", "group": "A", "stadium": "Mercedes-Benz Stadium", "location": "Atlanta", "date": "2026-06-18 12:00:00", "days_offset": 7},
  {"home": "Switzerland", "away": "Bosnia and Herzegovina", "group": "B", "stadium": "SoFi Stadium", "location": "Los Angeles", "date": "2026-06-18 15:00:00", "days_offset": 7},
  {"home": "Canada", "away": "Qatar", "group": "B", "stadium": "BC Place", "location": "Vancouver", "date": "2026-06-18 18:00:00", "days_offset": 7},
  {"home": "Mexico", "away": "South Korea", "group": "A", "stadium": "Estadio Akron", "location": "Guadalajara", "date": "2026-06-18 21:00:00", "days_offset": 7},
  {"home": "United States", "away": "Australia", "group": "D", "stadium": "Lumen Field", "location": "Seattle", "date": "2026-06-19 15:00:00", "days_offset": 8},
  {"home": "Scotland", "away": "Morocco", "group": "C", "stadium":  "Gillette Stadium", "location": "Boston", "date": "2026-06-19 18:00:00", "days_offset": 8},
  {"home": "Brazil", "away": "Haiti", "group": "C", "stadium": "Lincoln Financial Field", "location": "Philadelphia", "date": "2026-06-19 21:00:00", "days_offset": 8},
  {"home": "Turkey", "away": "Paraguay", "group": "D", "stadium": "Levi's Stadium", "location": "San Francisco", "date": "2026-06-20 00:00:00", "days_offset": 9},
  {"home": "Netherlands", "away": "Sweden", "group": "F", "stadium": "NRG Stadium", "location": "Houston", "date": "2026-06-20 13:00:00", "days_offset": 9},
  {"home": "Germany", "away": "Ivory Coast", "group": "E", "stadium": "BMO Field", "location": "Toronto", "date": "2026-06-20 16:00:00", "days_offset": 9},
  {"home": "Ecuador", "away": "Curaçao", "group": "E", "stadium": "Arrowhead Stadium", "location": "Kansas City", "date": "2026-06-20 20:00:00", "days_offset": 9},
  {"home": "Tunisia", "away": "Japan", "group": "F", "stadium": "Estadio BBVA", "location": "Monterrey", "date": "2026-06-21 00:00:00", "days_offset": 10},
  {"home": "Spain", "away": "Saudi Arabia", "group": "H", "stadium": "Mercedes-Benz Stadium", "location": "Atlanta", "date": "2026-06-21 12:00:00", "days_offset": 10},
  {"home": "Belgium", "away": "Iran", "group": "G", "stadium": "SoFi Stadium", "location": "Los Angeles", "date": "2026-06-21 15:00:00", "days_offset": 10},
  {"home": "Uruguay", "away": "Cabo Verde", "group": "H", "stadium": "Hard Rock Stadium", "location": "Miami", "date": "2026-06-21 18:00:00", "days_offset": 10},
  {"home": "New Zealand", "away": "Egypt", "group": "G", "stadium": "BC Place", "location": "Vancouver", "date": "2026-06-21 21:00:00", "days_offset": 10},
  {"home": "France", "away": "Iraq", "group": "I", "stadium": "Lincoln Financial Field", "location": "Philadelphia", "date": "2026-06-22 20:00:00", "days_offset": 11},
  {"home": "Norway", "away": "Senegal", "group": "I", "stadium": "MetLife Stadium", "location": "New York/New Jersey", "date": "2026-06-22 16:00:00", "days_offset": 11},
  {"home": "Argentina", "away": "Austria", "group": "J", "stadium": "AT&T Stadium", "location": "Dallas", "date": "2026-06-22 13:00:00", "days_offset": 11},
  {"home": "Jordan", "away": "Algeria", "group": "J", "stadium": "Levi's Stadium", "location": "San Francisco", "date": "2026-06-22 23:00:00", "days_offset": 11},
  {"home": "Portugal", "away": "Uzbekistan", "group": "K", "stadium": "NRG Stadium", "location": "Houston", "date": "2026-06-23 13:00:00", "days_offset": 12},
  {"home": "England", "away": "Ghana", "group": "L", "stadium": "Gillette Stadium", "location": "Boston", "date": "2026-06-23 16:00:00", "days_offset": 12},
  {"home": "Panama", "away": "Croatia", "group": "L", "stadium": "BMO Field", "location": "Toronto", "date": "2026-06-23 19:00:00", "days_offset": 12},
  {"home": "Colombia", "away": "DR Congo", "group": "K", "stadium": "Estadio Akron", "location": "Guadalajara", "date": "2026-06-23 22:00:00", "days_offset": 12},
  {"home": "Bosnia and Herzegovina", "away": "Qatar", "group": "B", "stadium": "Mercedes-Benz Stadium", "location": "Atlanta", "date": "2026-06-24 16:00:00", "days_offset": 13},
  {"home": "Switzerland", "away": "Canada", "group": "B", "stadium": "BC Place", "location": "Vancouver", "date": "2026-06-24 16:00:00", "days_offset": 13},
  {"home": "Czechia", "away": "Mexico", "group": "A", "stadium": "Estadio Azteca", "location": "Mexico City", "date": "2026-06-24 21:00:00", "days_offset": 13},
  {"home": "South Africa", "away": "South Korea", "group": "A", "stadium": "Estadio BBVA", "location": "Monterrey", "date": "2026-06-24 21:00:00", "days_offset": 13},
  {"home": "Ecuador", "away": "Germany", "group": "E", "stadium": "MetLife Stadium", "location": "New York/New Jersey", "date": "2026-06-25 16:00:00", "days_offset": 14},
  {"home": "Curaçao", "away": "Ivory Coast", "group": "E", "stadium": "Lincoln Financial Field", "location": "Philadelphia", "date": "2026-06-25 16:00:00", "days_offset": 14},
  {"home": "Japan", "away": "Sweden", "group": "F", "stadium": "AT&T Stadium", "location": "Dallas", "date": "2026-06-25 19:00:00", "days_offset": 14},
  {"home": "Tunisia", "away": "Netherlands", "group": "F", "stadium": "Arrowhead Stadium", "location": "Kansas City", "date": "2026-06-25 19:00:00", "days_offset": 14},
  {"home": "Scotland", "away": "Brazil", "group": "C", "stadium": "Hard Rock Stadium", "location": "Miami", "date": "2026-06-24 18:00:00", "days_offset": 14},
  {"home": "Morocco", "away": "Haiti", "group": "C", "stadium": "Lumen Field", "location": "Seattle", "date": "2026-06-24 18:00:00", "days_offset": 14},
  {"home": "Paraguay", "away": "Australia", "group": "D", "stadium": "NRG Stadium", "location": "Houston", "date": "2026-06-25 22:00:00", "days_offset": 15},
  {"home": "Turkey", "away": "United States", "group": "D", "stadium": "SoFi Stadium", "location": "Los Angeles", "date": "2026-06-25 22:00:00", "days_offset": 15},
  {"home": "Cabo Verde", "away": "Saudi Arabia", "group": "H", "stadium": "BMO Field", "location": "Toronto", "date": "2026-06-26 20:00:00", "days_offset": 15},
  {"home": "Uruguay", "away": "Spain", "group": "H", "stadium": "Estadio Akron", "location": "Guadalajara", "date": "2026-06-26 20:00:00", "days_offset": 15},
  {"home": "Egypt", "away": "Iran", "group": "G", "stadium": "Estadio Azteca", "location": "Mexico City", "date": "2026-06-26 23:00:00", "days_offset": 15},
  {"home": "New Zealand", "away": "Belgium", "group": "G", "stadium": "Estadio BBVA", "location": "Monterrey", "date": "2026-06-26 23:00:00", "days_offset": 15},
  {"home": "Norway", "away": "France", "group": "I", "stadium": "Mercedes-Benz Stadium", "location": "Atlanta", "date": "2026-06-26 15:00:00", "days_offset": 16},
  {"home": "Senegal", "away": "Iraq", "group": "I", "stadium": "Gillette Stadium", "location": "Boston", "date": "2026-06-26 15:00:00", "days_offset": 16},
  {"home": "Algeria", "away": "Austria", "group": "J", "stadium": "Arrowhead Stadium", "location": "Kansas City", "date": "2026-06-27 22:00:00", "days_offset": 16},
  {"home": "Jordan", "away": "Argentina", "group": "J", "stadium": "AT&T Stadium", "location": "Dallas", "date": "2026-06-27 22:00:00", "days_offset": 16},
  {"home": "Panama", "away": "England", "group": "L", "stadium": "MetLife Stadium", "location": "New York/New Jersey", "date": "2026-06-27 17:00:00", "days_offset": 16},
  {"home": "Croatia", "away": "Ghana", "group": "L", "stadium": "Lincoln Financial Field", "location": "Philadelphia", "date": "2026-06-27 17:00:00", "days_offset": 16},
  {"home": "DR Congo", "away": "Uzbekistan", "group": "K", "stadium": "Levi's Stadium", "location": "San Francisco", "date": "2026-06-27 19:30:00", "days_offset": 16},
  {"home": "Colombia", "away": "Portugal", "group": "K", "stadium": "Hard Rock Stadium", "location": "Miami", "date": "2026-06-27 19:30:00", "days_offset": 16}
]


class Command(BaseCommand):
    help = 'Seed group stage matches'

    def handle(self, *args, **kwargs):
        eastern = ZoneInfo('America/New_York')

        for data in MATCHES:
            group = Group.objects.get(name=data['group'])
            home = Team.objects.get(name=data['home'])
            away = Team.objects.get(name=data['away'])
            date = datetime.strptime(data['date'], '%Y-%m-%d %H:%M:%S').replace(tzinfo=eastern)

            match, created = Match.objects.get_or_create(
                home_team=home,
                away_team=away,
                round=Match.RoundChoices.GS,
                defaults={
                    'group': group,
                    'stadium': data['stadium'],
                    'location': data['location'],
                    'date': date,
                }
            )
            status = 'created' if created else 'already exists'
            self.stdout.write(f'{home} vs {away} (Group {data["group"]}) — {status}')
