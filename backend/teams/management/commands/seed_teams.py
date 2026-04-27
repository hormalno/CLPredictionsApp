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
    {'name': 'South Korea', 'short_name': 'KOR', 'country_code': 'KR', 'group': 'A', 'logo': 'kr.svg'},
    {'name': 'Czechia', 'short_name': 'CZE', 'country_code': 'CZ', 'group': 'A', 'logo': 'cz.svg'},
    # Group B
    {'name': 'Canada', 'short_name': 'CAN', 'country_code': 'CA', 'group': 'B', 'logo': 'ca.svg'},
    {'name': 'Bosnia and Herzegovina', 'short_name': 'BIH', 'country_code': 'BA', 'group': 'B', 'logo': 'ba.svg'},
    {'name': 'Qatar', 'short_name': 'QAT', 'country_code': 'QA', 'group': 'B', 'logo': 'qa.svg'},
    {'name': 'Switzerland', 'short_name': 'SUI', 'country_code': 'CH', 'group': 'B', 'logo': 'ch.svg'},
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
    {'name': 'Germany', 'short_name': 'GER', 'country_code': 'DE', 'group': 'E', 'logo': 'de.svg'},
    {'name': 'Curaçao', 'short_name': 'CUW', 'country_code': 'CW', 'group': 'E', 'logo': 'cw.svg'},
    {'name': 'Ivory Coast', 'short_name': 'CIV', 'country_code': 'CI', 'group': 'E', 'logo': 'ci.svg'},
    {'name': 'Ecuador', 'short_name': 'ECU', 'country_code': 'EC', 'group': 'E', 'logo': 'ec.svg'},
    # Group F
    {'name': 'Netherlands', 'short_name': 'NED', 'country_code': 'NL', 'group': 'F', 'logo': 'nl.svg'},
    {'name': 'Japan', 'short_name': 'JPN', 'country_code': 'JP', 'group': 'F', 'logo': 'jp.svg'},
    {'name': 'Sweden', 'short_name': 'SWE', 'country_code': 'SE', 'group': 'F', 'logo': 'se.svg'},
    {'name': 'Tunisia', 'short_name': 'TUN', 'country_code': 'TN', 'group': 'F', 'logo': 'tn.svg'},
    # Group G
    {'name': 'Belgium', 'short_name': 'BEL', 'country_code': 'BE', 'group': 'G', 'logo': 'be.svg'},
    {'name': 'Egypt', 'short_name': 'EGY', 'country_code': 'EG', 'group': 'G', 'logo': 'eg.svg'},
    {'name': 'Iran', 'short_name': 'IRN', 'country_code': 'IR', 'group': 'G', 'logo': 'ir.svg'},
    {'name': 'New Zealand', 'short_name': 'NZL', 'country_code': 'NZ', 'group': 'G', 'logo': 'nz.svg'},
    # Group H
    {'name': 'Spain', 'short_name': 'ESP', 'country_code': 'ES', 'group': 'H', 'logo': 'es.svg'},
    {'name': 'Cabo Verde', 'short_name': 'CPV', 'country_code': 'CV', 'group': 'H', 'logo': 'cv.svg'},
    {'name': 'Saudi Arabia', 'short_name': 'KSA', 'country_code': 'SA', 'group': 'H', 'logo': 'sa.svg'},
    {'name': 'Uruguay', 'short_name': 'URU', 'country_code': 'UY', 'group': 'H', 'logo': 'uy.svg'},
    # Group I
    {'name': 'France', 'short_name': 'FRA', 'country_code': 'FR', 'group': 'I', 'logo': 'fr.svg'},
    {'name': 'Senegal', 'short_name': 'SEN', 'country_code': 'SN', 'group': 'I', 'logo': 'sn.svg'},
    {'name': 'Iraq', 'short_name': 'IRQ', 'country_code': 'IQ', 'group': 'I', 'logo': 'iq.svg'},
    {'name': 'Norway', 'short_name': 'NOR', 'country_code': 'NO', 'group': 'I', 'logo': 'no.svg'},
    # Group J
    {'name': 'Argentina', 'short_name': 'ARG', 'country_code': 'AR', 'group': 'J', 'logo': 'ar.svg'},
    {'name': 'Algeria', 'short_name': 'ALG', 'country_code': 'DZ', 'group': 'J', 'logo': 'dz.svg'},
    {'name': 'Austria', 'short_name': 'AUT', 'country_code': 'AT', 'group': 'J', 'logo': 'at.svg'},
    {'name': 'Jordan', 'short_name': 'JOR', 'country_code': 'JO', 'group': 'J', 'logo': 'jo.svg'},
    # Group K
    {'name': 'Portugal', 'short_name': 'POR', 'country_code': 'PT', 'group': 'K', 'logo': 'pt.svg'},
    {'name': 'DR Congo', 'short_name': 'CGO', 'country_code': 'CG', 'group': 'K', 'logo': 'cg.svg'},
    {'name': 'Uzbekistan', 'short_name': 'UZB', 'country_code': 'UZ', 'group': 'K', 'logo': 'uz.svg'},
    {'name': 'Colombia', 'short_name': 'COL', 'country_code': 'CO', 'group': 'K', 'logo': 'co.svg'},
    # Group L
    {'name': 'England', 'short_name': 'ENG', 'country_code': 'GB', 'group': 'L', 'logo': 'gb-eng.svg'},
    {'name': 'Croatia', 'short_name': 'CRO', 'country_code': 'HR', 'group': 'L', 'logo': 'hr.svg'},
    {'name': 'Ghana', 'short_name': 'GHA', 'country_code': 'GH', 'group': 'L', 'logo': 'gh.svg'},
    {'name': 'Panama', 'short_name': 'PAN', 'country_code': 'PA', 'group': 'L', 'logo': 'pa.svg'},
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
