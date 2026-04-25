from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from matches.models import Match
from groups.models import Group
from teams.models import Team

# Each team plays the other 3 in the group once (6 matches per group)
MATCHES = [
    # Group A
    {'home': 'Real Madrid',     'away': 'Bayern Munich', 'group': 'A', 'stadium': 'Santiago Bernabeu',  'location': 'Madrid',    'days_offset': 1},
    {'home': 'PSG',             'away': 'Benfica',        'group': 'A', 'stadium': 'Parc des Princes',   'location': 'Paris',     'days_offset': 1},
    {'home': 'Bayern Munich',   'away': 'PSG',            'group': 'A', 'stadium': 'Allianz Arena',      'location': 'Munich',    'days_offset': 8},
    {'home': 'Benfica',         'away': 'Real Madrid',    'group': 'A', 'stadium': 'Estadio da Luz',     'location': 'Lisbon',    'days_offset': 8},
    {'home': 'Real Madrid',     'away': 'PSG',            'group': 'A', 'stadium': 'Santiago Bernabeu',  'location': 'Madrid',    'days_offset': 15},
    {'home': 'Bayern Munich',   'away': 'Benfica',        'group': 'A', 'stadium': 'Allianz Arena',      'location': 'Munich',    'days_offset': 15},
    # Group B
    {'home': 'Manchester City', 'away': 'Inter Milan',    'group': 'B', 'stadium': 'Etihad Stadium',     'location': 'Manchester','days_offset': 2},
    {'home': 'Galatasaray',     'away': 'Ajax',           'group': 'B', 'stadium': 'Rams Park',          'location': 'Istanbul',  'days_offset': 2},
    {'home': 'Inter Milan',     'away': 'Galatasaray',    'group': 'B', 'stadium': 'San Siro',           'location': 'Milan',     'days_offset': 9},
    {'home': 'Ajax',            'away': 'Manchester City','group': 'B', 'stadium': 'Johan Cruyff Arena', 'location': 'Amsterdam', 'days_offset': 9},
    {'home': 'Manchester City', 'away': 'Galatasaray',    'group': 'B', 'stadium': 'Etihad Stadium',     'location': 'Manchester','days_offset': 16},
    {'home': 'Inter Milan',     'away': 'Ajax',           'group': 'B', 'stadium': 'San Siro',           'location': 'Milan',     'days_offset': 16},
]


class Command(BaseCommand):
    help = 'Seed group stage matches for groups A and B'

    def handle(self, *args, **kwargs):
        base_date = timezone.now().replace(hour=20, minute=0, second=0, microsecond=0)

        for data in MATCHES:
            group = Group.objects.get(name=data['group'])
            home = Team.objects.get(name=data['home'])
            away = Team.objects.get(name=data['away'])
            date = base_date + timedelta(days=data['days_offset'])

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
