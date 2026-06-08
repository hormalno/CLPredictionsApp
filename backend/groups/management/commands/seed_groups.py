from django.core.management.base import BaseCommand
from groups.models import Group

# next_p1 / next_p2: match_id of the R32 match where the group winner / runner-up goes.
# next_p3: list of match_ids of R32 matches where this group's 3rd-place team can go,
#          depending on the combination of qualifying 3rd-place teams across all groups.
#
# R32 match_id reference (from seed_knockout_matches):
#   73: 2A(h) vs 2B(a)   74: 1E(h) vs 3*(a)    75: 1F(h) vs 2C(a)   76: 1C(h) vs 2F(a)
#   77: 1I(h) vs 3*(a)   78: 2E(h) vs 2I(a)    79: 1A(h) vs 3*(a)   80: 1L(h) vs 3*(a)
#   81: 1D(h) vs 3*(a)   82: 1G(h) vs 3*(a)    83: 2K(h) vs 2L(a)   84: 1H(h) vs 2J(a)
#   85: 1B(h) vs 3*(a)   86: 1J(h) vs 2H(a)    87: 1K(h) vs 3*(a)   88: 2D(h) vs 2G(a)
GROUPS = [
    {"name": "A", "next_p1": 79, "slot_p1": "home", "next_p2": 73, "slot_p2": "home", "next_p3": [74,82],             "slot_p3": "away"},
    {"name": "B", "next_p1": 85, "slot_p1": "home", "next_p2": 73, "slot_p2": "away", "next_p3": [74,81],             "slot_p3": "away"},
    {"name": "C", "next_p1": 76, "slot_p1": "home", "next_p2": 75, "slot_p2": "away", "next_p3": [74,77,79],          "slot_p3": "away"},
    {"name": "D", "next_p1": 81, "slot_p1": "home", "next_p2": 88, "slot_p2": "home", "next_p3": [74,77,87],          "slot_p3": "away"},
    {"name": "E", "next_p1": 74, "slot_p1": "home", "next_p2": 78, "slot_p2": "home", "next_p3": [79,80,81,82,85,87], "slot_p3": "away"},
    {"name": "F", "next_p1": 75, "slot_p1": "home", "next_p2": 76, "slot_p2": "away", "next_p3": [74,77,79,81,85],    "slot_p3": "away"},
    {"name": "G", "next_p1": 82, "slot_p1": "home", "next_p2": 88, "slot_p2": "away", "next_p3": [77,85],             "slot_p3": "away"},
    {"name": "H", "next_p1": 84, "slot_p1": "home", "next_p2": 86, "slot_p2": "away", "next_p3": [77,79,80,82],       "slot_p3": "away"},
    {"name": "I", "next_p1": 77, "slot_p1": "home", "next_p2": 78, "slot_p2": "away", "next_p3": [79,80,81,82,85,87], "slot_p3": "away"},
    {"name": "J", "next_p1": 86, "slot_p1": "home", "next_p2": 84, "slot_p2": "away", "next_p3": [80,81,82,85,87],    "slot_p3": "away"},
    {"name": "K", "next_p1": 87, "slot_p1": "home", "next_p2": 83, "slot_p2": "home", "next_p3": [80],                "slot_p3": "away"},
    {"name": "L", "next_p1": 80, "slot_p1": "home", "next_p2": 83, "slot_p2": "away", "next_p3": [87],                "slot_p3": "away"},
]


class Command(BaseCommand):
    help = 'Seed groups A–L with next-round match references'

    def handle(self, *args, **kwargs):
        for data in GROUPS:
            group, created = Group.objects.update_or_create(
                name=data['name'],
                defaults={
                    'next_p1': data['next_p1'],
                    'slot_p1': data['slot_p1'],
                    'next_p2': data['next_p2'],
                    'slot_p2': data['slot_p2'],
                    'next_p3': data['next_p3'],
                    'slot_p3': data['slot_p3'],
                },
            )
            status = 'created' if created else 'updated'
            self.stdout.write(f'Group {data["name"]} (1st->{data["next_p1"]}, 2nd->{data["next_p2"]}) - {status}')

        self.stdout.write(self.style.SUCCESS(f'\nDone — {len(GROUPS)} groups seeded.'))
