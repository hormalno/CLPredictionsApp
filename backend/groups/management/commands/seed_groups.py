from django.core.management.base import BaseCommand
from groups.models import Group

# next_p1 / next_p2: match_id of the R32 match where the group winner / runner-up goes.
# next_p3: 0 — 3rd-place routing depends on the combination of qualifying 3rd-place
#          teams across all groups; it cannot be pre-assigned per group.
#
# R32 match_id reference (from seed_knockout_matches):
#   73: 2A(h) vs 2B(a)   74: 1E(h) vs 3*(a)    75: 1F(h) vs 2C(a)   76: 1C(h) vs 2F(a)
#   77: 1I(h) vs 3*(a)   78: 2E(h) vs 2I(a)    79: 1A(h) vs 3*(a)   80: 1L(h) vs 3*(a)
#   81: 1D(h) vs 3*(a)   82: 1G(h) vs 3*(a)    83: 2K(h) vs 2L(a)   84: 1H(h) vs 2J(a)
#   85: 1B(h) vs 3*(a)   86: 1J(h) vs 2H(a)    87: 1K(h) vs 3*(a)   88: 2D(h) vs 2G(a)
GROUPS = [
    {"name": "A", "next_p1": 79, "next_p2": 73, "next_p3": 0},
    {"name": "B", "next_p1": 85, "next_p2": 73, "next_p3": 0},
    {"name": "C", "next_p1": 76, "next_p2": 75, "next_p3": 0},
    {"name": "D", "next_p1": 81, "next_p2": 88, "next_p3": 0},
    {"name": "E", "next_p1": 74, "next_p2": 78, "next_p3": 0},
    {"name": "F", "next_p1": 75, "next_p2": 76, "next_p3": 0},
    {"name": "G", "next_p1": 82, "next_p2": 88, "next_p3": 0},
    {"name": "H", "next_p1": 84, "next_p2": 86, "next_p3": 0},
    {"name": "I", "next_p1": 77, "next_p2": 78, "next_p3": 0},
    {"name": "J", "next_p1": 86, "next_p2": 84, "next_p3": 0},
    {"name": "K", "next_p1": 87, "next_p2": 83, "next_p3": 0},
    {"name": "L", "next_p1": 80, "next_p2": 83, "next_p3": 0},
]


class Command(BaseCommand):
    help = 'Seed groups A–L with next-round match references'

    def handle(self, *args, **kwargs):
        for data in GROUPS:
            group, created = Group.objects.update_or_create(
                name=data['name'],
                defaults={
                    'next_p1': data['next_p1'],
                    'next_p2': data['next_p2'],
                    'next_p3': data['next_p3'],
                },
            )
            status = 'created' if created else 'updated'
            self.stdout.write(f'Group {data["name"]} (1st→{data["next_p1"]}, 2nd→{data["next_p2"]}) — {status}')

        self.stdout.write(self.style.SUCCESS(f'\nDone — {len(GROUPS)} groups seeded.'))
