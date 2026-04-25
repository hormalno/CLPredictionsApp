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
    # Group B
    {'name': 'Canada', 'short_name': 'CAN', 'country_code': 'CA', 'group': 'A', 'logo': 'mx.svg'},
    {'name': 'Bosnia And Herzegovina', 'short_name': 'BIH', 'country_code': 'BI', 'group': 'A', 'logo': 'za.svg'},
    {'name': 'Qatar', 'short_name': 'QAT', 'country_code': 'QT', 'group': 'A', 'logo': 'kr.svg'},
    {'name': 'Switzerland', 'short_name': 'SUI', 'country_code': 'SI', 'group': 'A', 'logo': 'cz.svg'},
    # Group C
    {'name': 'Brazil', 'short_name': 'BRA', 'country_code': 'BR', 'group': 'A', 'logo': 'mx.svg'},
    {'name': 'Morocco', 'short_name': 'MAR', 'country_code': 'MA', 'group': 'A', 'logo': 'za.svg'},
    {'name': 'Haiti', 'short_name': 'HAI', 'country_code': 'KR', 'group': 'A', 'logo': 'kr.svg'},
    {'name': 'Scotland', 'short_name': 'SCI', 'country_code': 'CZ', 'group': 'A', 'logo': 'cz.svg'},
    # Group D
    {'name': 'United States', 'short_name': 'USA', 'country_code': 'US', 'group': 'A', 'logo': 'mx.svg'},
    {'name': 'Paraguay', 'short_name': 'PAR', 'country_code': 'ZA', 'group': 'A', 'logo': 'za.svg'},
    {'name': 'Australia', 'short_name': 'AUS', 'country_code': 'KR', 'group': 'A', 'logo': 'kr.svg'},
    {'name': 'Turkey', 'short_name': 'TUR', 'country_code': 'CZ', 'group': 'A', 'logo': 'cz.svg'},
    # Group E
    {'name': '', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': '', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': '', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': '', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    # Group F
    {'name': '', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': '', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': '', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': '', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    # Group G
    {'name': '', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': '', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': '', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': '', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    # Group H
    {'name': '', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': '', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': '', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': '', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    # Group I
    {'name': '', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': '', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': '', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': '', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    # Group J
    {'name': '', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': '', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': '', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': '', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    # Group K
    {'name': '', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': '', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': '', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': '', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    # Group L
    {'name': '', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': '', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': '', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': '', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
]


class Command(BaseCommand):
    help = 'Seed teams for groups A and B'

    def add_arguments(self, parser):
        parser.add_argument(
            '--refresh-logos',
            action='store_true',
            help='Overwrite logos for existing teams',
        )

    def handle(self, *args, **kwargs):
        refresh_logos = kwargs['refresh_logos']
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

            if not created and refresh_logos and data['logo']:
                team.logo = data['logo']
                team.save(update_fields=['logo'])
                self.stdout.write(f'  Logo updated for {team.name}')

            group.teams.add(team)
            status = 'created' if created else 'already exists'
            self.stdout.write(f'{team.name} ({status}) → Group {group_name}')
