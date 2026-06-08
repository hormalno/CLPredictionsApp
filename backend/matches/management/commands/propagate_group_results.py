from django.core.management.base import BaseCommand
from groups.models import Group
from matches.models import Match
from matches.views import _compute_group_standings, _propagate_third_place_teams


class Command(BaseCommand):
    help = 'Retroactively assign R32 teams from finished group standings'

    def handle(self, *args, **kwargs):
        groups = Group.objects.all()
        propagated = 0

        for group in groups:
            total = group.matches.count()
            finished = group.matches.filter(is_finished=True).count()

            if total == 0 or finished < total:
                self.stdout.write(f'Group {group.name}: {finished}/{total} finished — skipping')
                continue

            ranked = _compute_group_standings(group)
            if len(ranked) < 2:
                self.stdout.write(self.style.WARNING(f'Group {group.name}: fewer than 2 teams in standings — skipping'))
                continue

            for pos, team in [(1, ranked[0]['team']), (2, ranked[1]['team'])]:
                placeholder = f'{pos}{group.name}'
                rows = Match.objects.filter(home_placeholder=placeholder).update(home_team=team)
                rows += Match.objects.filter(away_placeholder=placeholder).update(away_team=team)
                self.stdout.write(f'  {placeholder} → {team.name} ({rows} row(s) updated)')

            propagated += 1

        if propagated:
            self.stdout.write(f'\nPropagating 3rd-place teams...')
            _propagate_third_place_teams()

        self.stdout.write(self.style.SUCCESS(f'\nDone — {propagated} group(s) propagated.'))
