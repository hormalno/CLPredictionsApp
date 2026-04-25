import os
import shutil
from django.conf import settings
from django.core.management.base import BaseCommand
from teams.models import Team
from groups.models import Group

FIXTURES_LOGOS_DIR = os.path.join(
    os.path.dirname(__file__), '..', '..', 'logos'
)

TEAMS = [
    # Group A
    {'name': 'Real Madrid',     'short_name': 'RMA', 'country_code': 'ES', 'group': 'A', 'logo': 'real_madrid.png'},
    {'name': 'Bayern Munich',   'short_name': 'BAY', 'country_code': 'DE', 'group': 'A', 'logo': 'bayern_munich.png'},
    {'name': 'PSG',             'short_name': 'PSG', 'country_code': 'FR', 'group': 'A', 'logo': 'psg.png'},
    {'name': 'Benfica',         'short_name': 'BEN', 'country_code': 'PT', 'group': 'A', 'logo': 'benfica.png'},
    # Group B
    {'name': 'Manchester City', 'short_name': 'MCI', 'country_code': 'GB', 'group': 'B', 'logo': 'manchester_city.png'},
    {'name': 'Inter Milan',     'short_name': 'INT', 'country_code': 'IT', 'group': 'B', 'logo': 'inter_milan.png'},
    {'name': 'Galatasaray',     'short_name': 'GAL', 'country_code': 'TR', 'group': 'B', 'logo': 'galatasaray.png'},
    {'name': 'Ajax',            'short_name': 'AJX', 'country_code': 'NL', 'group': 'B', 'logo': 'ajax.png'},
]


class Command(BaseCommand):
    help = 'Seed teams for groups A and B'

    def handle(self, *args, **kwargs):
        media_logos_dir = os.path.join(settings.MEDIA_ROOT, 'logos')
        os.makedirs(media_logos_dir, exist_ok=True)

        for data in TEAMS:
            group_name = data.pop('group')
            logo_filename = data.pop('logo')

            logo_src = os.path.join(FIXTURES_LOGOS_DIR, logo_filename)
            logo_dst = os.path.join(media_logos_dir, logo_filename)

            if os.path.exists(logo_src):
                shutil.copy2(logo_src, logo_dst)
                data['logo'] = f'logos/{logo_filename}'
            else:
                self.stdout.write(self.style.WARNING(f'  Logo not found: {logo_filename} — skipping'))
                data['logo'] = ''

            group, _ = Group.objects.get_or_create(name=group_name)
            team, created = Team.objects.get_or_create(name=data['name'], defaults=data)
            group.teams.add(team)
            status = 'created' if created else 'already exists'
            self.stdout.write(f'{team.name} ({status}) → Group {group_name}')
