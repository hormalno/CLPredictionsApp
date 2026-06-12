from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand, CommandError

from matches.models import Match
from predictions.models import KnockoutPrediction
from teams.models import Team

PREDICTIONS = [
    {"match_id": 73,  "home": "South Korea",  "away": "Canada",      "winner": "South Korea"},
    {"match_id": 74,  "home": "Germany",       "away": "Haiti",       "winner": "Germany"},
    {"match_id": 75,  "home": "Netherlands",   "away": "Morocco",     "winner": "Netherlands"},
    {"match_id": 76,  "home": "Brazil",        "away": "Japan",       "winner": "Brazil"},
    {"match_id": 77,  "home": "France",        "away": "Paraguay",    "winner": "France"},
    {"match_id": 78,  "home": "Ivory Coast",   "away": "Senegal",     "winner": "Senegal"},
    {"match_id": 79,  "home": "Mexico",        "away": "Curaçao",     "winner": "Mexico"},
    {"match_id": 80,  "home": "England",       "away": "Jordan",      "winner": "England"},
    {"match_id": 81,  "home": "United States", "away": "Qatar",       "winner": "United States"},
    {"match_id": 82,  "home": "Belgium",       "away": "Norway",      "winner": "Norway"},
    {"match_id": 83,  "home": "Colombia",      "away": "Croatia",     "winner": "Croatia"},
    {"match_id": 84,  "home": "Spain",         "away": "Austria",     "winner": "Spain"},
    {"match_id": 85,  "home": "Switzerland",   "away": "Sweden",      "winner": "Switzerland"},
    {"match_id": 86,  "home": "Argentina",     "away": "Uruguay",     "winner": "Argentina"},
    {"match_id": 87,  "home": "Portugal",      "away": "Ghana",       "winner": "Portugal"},
    {"match_id": 88,  "home": "Australia",     "away": "Egypt",       "winner": "Egypt"},
    {"match_id": 89,  "home": "Germany",       "away": "France",      "winner": "France"},
    {"match_id": 90,  "home": "South Korea",   "away": "Netherlands", "winner": "Netherlands"},
    {"match_id": 91,  "home": "Brazil",        "away": "Senegal",     "winner": "Brazil"},
    {"match_id": 92,  "home": "Mexico",        "away": "England",     "winner": "England"},
    {"match_id": 93,  "home": "Croatia",       "away": "Spain",       "winner": "Spain"},
    {"match_id": 94,  "home": "United States", "away": "Norway",      "winner": "Norway"},
    {"match_id": 95,  "home": "Argentina",     "away": "Egypt",       "winner": "Argentina"},
    {"match_id": 96,  "home": "Switzerland",   "away": "Portugal",    "winner": "Portugal"},
    {"match_id": 97,  "home": "France",        "away": "Netherlands", "winner": "France"},
    {"match_id": 98,  "home": "Spain",         "away": "Norway",      "winner": "Spain"},
    {"match_id": 99,  "home": "Brazil",        "away": "England",     "winner": "England"},
    {"match_id": 100, "home": "Argentina",     "away": "Portugal",    "winner": "Portugal"},
    {"match_id": 101, "home": "France",        "away": "Spain",       "winner": "France"},
    {"match_id": 102, "home": "England",       "away": "Portugal",    "winner": "Portugal"},
    {"match_id": 103, "home": "Spain",         "away": "England",     "winner": "Spain"},
    {"match_id": 104, "home": "France",        "away": "Portugal",    "winner": "France"},
]


class Command(BaseCommand):
    help = 'Seed knockout predictions for a given user (exported from moni)'

    def add_arguments(self, parser):
        parser.add_argument('--username', required=True, help='Username to assign predictions to')

    def handle(self, *args, **options):
        User = get_user_model()
        username = options['username']

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise CommandError(f'User "{username}" does not exist.')

        team_cache = {t.name: t for t in Team.objects.all()}
        match_cache = {m.match_id: m for m in Match.objects.filter(match_id__in=[p['match_id'] for p in PREDICTIONS])}

        created_count = 0
        updated_count = 0

        for data in PREDICTIONS:
            match = match_cache.get(data['match_id'])
            if not match:
                self.stdout.write(self.style.WARNING(f'Match {data["match_id"]} not found — skipping.'))
                continue

            home_team = team_cache.get(data['home'])
            away_team = team_cache.get(data['away'])
            winner = team_cache.get(data['winner'])

            if not home_team:
                self.stdout.write(self.style.WARNING(f'Team "{data["home"]}" not found — skipping match {data["match_id"]}.'))
                continue
            if not away_team:
                self.stdout.write(self.style.WARNING(f'Team "{data["away"]}" not found — skipping match {data["match_id"]}.'))
                continue
            if not winner:
                self.stdout.write(self.style.WARNING(f'Team "{data["winner"]}" not found — skipping match {data["match_id"]}.'))
                continue

            obj, created = KnockoutPrediction.objects.get_or_create(match=match, user=user)
            KnockoutPrediction.objects.filter(pk=obj.pk).update(
                predicted_home_team=home_team,
                predicted_away_team=away_team,
                predicted_winner=winner,
            )

            if created:
                created_count += 1
            else:
                updated_count += 1

            self.stdout.write(f'[{match.round}] Match {match.match_id}: {data["home"]} vs {data["away"]} — winner: {data["winner"]} ({"created" if created else "updated"})')

        self.stdout.write(self.style.SUCCESS(f'\nDone — {created_count} created, {updated_count} updated for user "{username}".'))
