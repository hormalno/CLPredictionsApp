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
    {'name': 'Canada', 'short_name': 'CAN', 'country_code': 'CA', 'group': 'B', 'logo': 'mx.svg'},
    {'name': 'Bosnia And Herzegovina', 'short_name': 'BIH', 'country_code': 'BI', 'group': 'B', 'logo': 'za.svg'},
    {'name': 'Qatar', 'short_name': 'QAT', 'country_code': 'QT', 'group': 'B', 'logo': 'kr.svg'},
    {'name': 'Switzerland', 'short_name': 'SUI', 'country_code': 'SI', 'group': 'B', 'logo': 'cz.svg'},
    # Group C
    {'name': 'Brazil', 'short_name': 'BRA', 'country_code': 'BR', 'group': 'C', 'logo': 'br.svg'},
    {'name': 'Morocco', 'short_name': 'MAR', 'country_code': 'MA', 'group': 'C', 'logo': 'ma.svg'},
    {'name': 'Haiti', 'short_name': 'HAI', 'country_code': 'HT', 'group': 'C', 'logo': 'ht.svg'},
    {'name': 'Scotland', 'short_name': 'SCO', 'country_code': 'SC', 'group': 'C', 'logo': 'gb-sct.svg'},
    # Group D
    {'name': 'United States', 'short_name': 'USA', 'country_code': 'US', 'group': 'D', 'logo': 'us.svg'},
    {'name': 'Paraguay', 'short_name': 'PAR', 'country_code': 'PY', 'group': 'D', 'logo': 'py.svg'},
    {'name': 'Australia', 'short_name': 'AUS', 'country_code': 'AU', 'group': 'D', 'logo': 'au.svg'},
    {'name': 'Turkey', 'short_name': 'TUR', 'country_code': 'TR', 'group': 'D', 'logo': 'tr.svg'},
    # Group E
    {'name': 'Germany', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': 'Curacao', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': 'Cote dIvoire', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': 'Ecuador', 'short_name': 'EC', 'country_code': '', 'group': '', 'logo': '.svg'},
    # Group F
    {'name': 'Netherlands', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': 'Japan', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': 'Sweden', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': 'Tunisia', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    # Group G
    {'name': 'Belgium', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': 'Egypt', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': 'Iran', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': 'New Zealand', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    # Group H
    {'name': 'Spain', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': 'Cabo Verde', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': 'Saudi Arabia', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': 'Uruguay', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    # Group I
    {'name': 'France', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': 'Senegal', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': 'Iraq', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': 'Norway', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    # Group J
    {'name': 'Argentina', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': 'Algeria', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': 'Austria', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': 'Jordan', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    # Group K
    {'name': 'Portugal', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': 'Congo', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': 'Uzbekistan', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': 'Colombia', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    # Group L
    {'name': 'England', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': 'Croatia', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': 'Ghana', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
    {'name': 'Panama', 'short_name': '', 'country_code': '', 'group': '', 'logo': '.svg'},
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
