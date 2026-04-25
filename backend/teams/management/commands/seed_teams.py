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
    {'name': 'Mexico', 'short_name': 'MEX', 'country_code': 'MX', 'group': 'A', 'logo': 'mx.svg'},
    {'name': 'South Africa', 'short_name': 'ZAF', 'country_code': 'ZA', 'group': 'A', 'logo': 'za.svg'},
    {'name': 'Korea Republic', 'short_name': 'KOR', 'country_code': 'KR', 'group': 'A', 'logo': 'kr.svg'},
    {'name': 'Czechia', 'short_name': 'CZE', 'country_code': 'CZ', 'group': 'A', 'logo': 'cz.svg'},
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
