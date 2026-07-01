from django.core.management.base import BaseCommand
from django.db import transaction

from matches.models import Match
from predictions.signals import KNOCKOUT_TEAM_POINTS, score_knockout_teams


class Command(BaseCommand):
    help = (
        "Backfill home/away team-slot correctness for knockout matches whose "
        "teams are already confirmed by a finished feeder, without waiting for "
        "the match itself to be played. Safe to run repeatedly — score_knockout_teams "
        "recomputes points from the current bracket and leaves winner_correct alone."
    )

    def add_arguments(self, parser):
        parser.add_argument(
            "--dry-run",
            action="store_true",
            help="Report which matches would be rescored without writing anything.",
        )

    def handle(self, *args, **options):
        dry_run = options["dry_run"]

        matches = (
            Match.objects.filter(round__in=list(KNOCKOUT_TEAM_POINTS.keys()))
            .exclude(home_team__isnull=True, away_team__isnull=True)
            .order_by("round", "match_id")
        )

        if not matches:
            self.stdout.write("No knockout matches with confirmed teams found.")
            return

        if dry_run:
            for m in matches:
                self.stdout.write(
                    f"[dry-run] would rescore {m.round} {m} "
                    f"({'finished' if m.is_finished else 'pending'})"
                )
            self.stdout.write(self.style.WARNING(f"{len(matches)} match(es) — no changes written."))
            return

        with transaction.atomic():
            for m in matches:
                score_knockout_teams(m)

        self.stdout.write(self.style.SUCCESS(f"Rescored team slots for {len(matches)} knockout match(es)."))
