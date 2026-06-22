from django.core.management.base import BaseCommand

from matches.models import Match
from predictions.signals import score_match_predictions


class Command(BaseCommand):
    help = "Re-score all finished matches with the current point rules and refresh user totals."

    def handle(self, *args, **options):
        matches = Match.objects.filter(is_finished=True).order_by('id')
        count = matches.count()
        self.stdout.write(f"Re-scoring {count} finished match(es)...")

        for match in matches:
            score_match_predictions(match)
            self.stdout.write(f"  scored match {match.id}")

        self.stdout.write(self.style.SUCCESS(f"Done. Re-scored {count} match(es)."))
