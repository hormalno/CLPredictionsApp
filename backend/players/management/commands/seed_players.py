from django.core.management.base import BaseCommand
from players.models import Player
from teams.models import Team

PLAYERS = [
    # United States
    {"name": "Christian Pulisic", "position": "FW", "jersey_number": 10, "team": "United States"},
    {"name": "Weston McKennie", "position": "MF", "jersey_number": 8, "team": "United States"},
    {"name": "Matt Turner", "position": "GK", "jersey_number": 1, "team": "United States"},
    # Mexico
    {"name": "Hirving Lozano", "position": "FW", "jersey_number": 22, "team": "Mexico"},
    {"name": "Edson Álvarez", "position": "MF", "jersey_number": 4, "team": "Mexico"},
    {"name": "Guillermo Ochoa", "position": "GK", "jersey_number": 13, "team": "Mexico"},
    # Canada
    {"name": "Alphonso Davies", "position": "DF", "jersey_number": 19, "team": "Canada"},
    {"name": "Jonathan David", "position": "FW", "jersey_number": 20, "team": "Canada"},
    {"name": "Stephen Eustáquio", "position": "MF", "jersey_number": 7, "team": "Canada"},
    # Curaçao
    {"name": "Leandro Bacuna", "position": "MF", "jersey_number": 7, "team": "Curaçao"},
    {"name": "Juninho Bacuna", "position": "MF", "jersey_number": 8, "team": "Curaçao"},
    {"name": "Eloy Room", "position": "GK", "jersey_number": 1, "team": "Curaçao"},
    # Haiti
    {"name": "Duckens Nazon", "position": "FW", "jersey_number": 9, "team": "Haiti"},
    {"name": "Frantzdy Pierrot", "position": "FW", "jersey_number": 11, "team": "Haiti"},
    {"name": "Johny Placide", "position": "GK", "jersey_number": 1, "team": "Haiti"},
    # Panama
    {"name": "Aníbal Godoy", "position": "MF", "jersey_number": 20, "team": "Panama"},
    {"name": "Adalberto Carrasquilla", "position": "MF", "jersey_number": 6, "team": "Panama"},
    {"name": "Orlando Mosquera", "position": "GK", "jersey_number": 1, "team": "Panama"},
    # Argentina
    {"name": "Lionel Messi", "position": "FW", "jersey_number": 10, "team": "Argentina"},
    {"name": "Lautaro Martínez", "position": "FW", "jersey_number": 22, "team": "Argentina"},
    {"name": "Emiliano Martínez", "position": "GK", "jersey_number": 23, "team": "Argentina"},
    # Brazil
    {"name": "Vinícius Júnior", "position": "FW", "jersey_number": 7, "team": "Brazil"},
    {"name": "Rodrygo", "position": "FW", "jersey_number": 10, "team": "Brazil"},
    {"name": "Alisson Becker", "position": "GK", "jersey_number": 1, "team": "Brazil"},
    # Colombia
    {"name": "Luis Díaz", "position": "FW", "jersey_number": 7, "team": "Colombia"},
    {"name": "James Rodríguez", "position": "MF", "jersey_number": 10, "team": "Colombia"},
    {"name": "Davinson Sánchez", "position": "DF", "jersey_number": 23, "team": "Colombia"},
    # Ecuador
    {"name": "Enner Valencia", "position": "FW", "jersey_number": 13, "team": "Ecuador"},
    {"name": "Moisés Caicedo", "position": "MF", "jersey_number": 23, "team": "Ecuador"},
    {"name": "Pervis Estupiñán", "position": "DF", "jersey_number": 7, "team": "Ecuador"},
    # Paraguay
    {"name": "Miguel Almirón", "position": "FW", "jersey_number": 10, "team": "Paraguay"},
    {"name": "Julio Enciso", "position": "FW", "jersey_number": 11, "team": "Paraguay"},
    {"name": "Gustavo Gómez", "position": "DF", "jersey_number": 3, "team": "Paraguay"},
    # Uruguay
    {"name": "Federico Valverde", "position": "MF", "jersey_number": 15, "team": "Uruguay"},
    {"name": "Darwin Núñez", "position": "FW", "jersey_number": 19, "team": "Uruguay"},
    {"name": "Ronald Araújo", "position": "DF", "jersey_number": 4, "team": "Uruguay"},
    # England
    {"name": "Harry Kane", "position": "FW", "jersey_number": 9, "team": "England"},
    {"name": "Jude Bellingham", "position": "MF", "jersey_number": 10, "team": "England"},
    {"name": "Jordan Pickford", "position": "GK", "jersey_number": 1, "team": "England"},
    # France
    {"name": "Kylian Mbappé", "position": "FW", "jersey_number": 10, "team": "France"},
    {"name": "Aurélien Tchouaméni", "position": "MF", "jersey_number": 8, "team": "France"},
    {"name": "William Saliba", "position": "DF", "jersey_number": 17, "team": "France"},
    # Croatia
    {"name": "Luka Modrić", "position": "MF", "jersey_number": 10, "team": "Croatia"},
    {"name": "Mateo Kovačić", "position": "MF", "jersey_number": 8, "team": "Croatia"},
    {"name": "Joško Gvardiol", "position": "DF", "jersey_number": 20, "team": "Croatia"},
    # Norway
    {"name": "Erling Haaland", "position": "FW", "jersey_number": 9, "team": "Norway"},
    {"name": "Martin Ødegaard", "position": "MF", "jersey_number": 10, "team": "Norway"},
    {"name": "Alexander Sørloth", "position": "FW", "jersey_number": 11, "team": "Norway"},
    # Portugal
    {"name": "Cristiano Ronaldo", "position": "FW", "jersey_number": 7, "team": "Portugal"},
    {"name": "Bruno Fernandes", "position": "MF", "jersey_number": 8, "team": "Portugal"},
    {"name": "Bernardo Silva", "position": "MF", "jersey_number": 10, "team": "Portugal"},
    # Germany
    {"name": "Florian Wirtz", "position": "MF", "jersey_number": 17, "team": "Germany"},
    {"name": "Jamal Musiala", "position": "MF", "jersey_number": 10, "team": "Germany"},
    {"name": "Joshua Kimmich", "position": "MF", "jersey_number": 6, "team": "Germany"},
    # Netherlands
    {"name": "Virgil van Dijk", "position": "DF", "jersey_number": 4, "team": "Netherlands"},
    {"name": "Cody Gakpo", "position": "FW", "jersey_number": 8, "team": "Netherlands"},
    {"name": "Frenkie de Jong", "position": "MF", "jersey_number": 21, "team": "Netherlands"},
    # Switzerland
    {"name": "Granit Xhaka", "position": "MF", "jersey_number": 10, "team": "Switzerland"},
    {"name": "Manuel Akanji", "position": "DF", "jersey_number": 5, "team": "Switzerland"},
    {"name": "Yann Sommer", "position": "GK", "jersey_number": 1, "team": "Switzerland"},
    # Scotland
    {"name": "Andy Robertson", "position": "DF", "jersey_number": 3, "team": "Scotland"},
    {"name": "Scott McTominay", "position": "MF", "jersey_number": 4, "team": "Scotland"},
    {"name": "John McGinn", "position": "MF", "jersey_number": 7, "team": "Scotland"},
    # Spain
    {"name": "Lamine Yamal", "position": "FW", "jersey_number": 19, "team": "Spain"},
    {"name": "Rodri", "position": "MF", "jersey_number": 16, "team": "Spain"},
    {"name": "Pedri", "position": "MF", "jersey_number": 8, "team": "Spain"},
    # Austria
    {"name": "David Alaba", "position": "DF", "jersey_number": 8, "team": "Austria"},
    {"name": "Marcel Sabitzer", "position": "MF", "jersey_number": 7, "team": "Austria"},
    {"name": "Marko Arnautović", "position": "FW", "jersey_number": 9, "team": "Austria"},
    # Belgium
    {"name": "Kevin De Bruyne", "position": "MF", "jersey_number": 7, "team": "Belgium"},
    {"name": "Romelu Lukaku", "position": "FW", "jersey_number": 9, "team": "Belgium"},
    {"name": "Thibaut Courtois", "position": "GK", "jersey_number": 1, "team": "Belgium"},
    # Bosnia and Herzegovina
    {"name": "Edin Džeko", "position": "FW", "jersey_number": 11, "team": "Bosnia and Herzegovina"},
    {"name": "Miralem Pjanić", "position": "MF", "jersey_number": 8, "team": "Bosnia and Herzegovina"},
    {"name": "Sead Kolašinac", "position": "DF", "jersey_number": 3, "team": "Bosnia and Herzegovina"},
    # Sweden
    {"name": "Alexander Isak", "position": "FW", "jersey_number": 11, "team": "Sweden"},
    {"name": "Viktor Gyökeres", "position": "FW", "jersey_number": 9, "team": "Sweden"},
    {"name": "Dejan Kulusevski", "position": "MF", "jersey_number": 21, "team": "Sweden"},
    # Turkey (stored as "Turkey" in DB)
    {"name": "Hakan Çalhanoğlu", "position": "MF", "jersey_number": 10, "team": "Turkey"},
    {"name": "Arda Güler", "position": "MF", "jersey_number": 25, "team": "Turkey"},
    {"name": "Merih Demiral", "position": "DF", "jersey_number": 3, "team": "Turkey"},
    # Czechia
    {"name": "Patrik Schick", "position": "FW", "jersey_number": 14, "team": "Czechia"},
    {"name": "Tomáš Souček", "position": "MF", "jersey_number": 8, "team": "Czechia"},
    {"name": "Tomáš Holeš", "position": "MF", "jersey_number": 22, "team": "Czechia"},
    # Australia
    {"name": "Mathew Ryan", "position": "GK", "jersey_number": 1, "team": "Australia"},
    {"name": "Ajdin Hrustic", "position": "MF", "jersey_number": 7, "team": "Australia"},
    {"name": "Mitchell Duke", "position": "FW", "jersey_number": 15, "team": "Australia"},
    # Iran
    {"name": "Mehdi Taremi", "position": "FW", "jersey_number": 9, "team": "Iran"},
    {"name": "Sardar Azmoun", "position": "FW", "jersey_number": 20, "team": "Iran"},
    {"name": "Alireza Jahanbakhsh", "position": "FW", "jersey_number": 7, "team": "Iran"},
    # Japan
    {"name": "Takefusa Kubo", "position": "FW", "jersey_number": 11, "team": "Japan"},
    {"name": "Wataru Endo", "position": "MF", "jersey_number": 6, "team": "Japan"},
    {"name": "Takehiro Tomiyasu", "position": "DF", "jersey_number": 16, "team": "Japan"},
    # Jordan
    {"name": "Musa Al-Taamari", "position": "FW", "jersey_number": 7, "team": "Jordan"},
    {"name": "Yazan Al-Naimat", "position": "FW", "jersey_number": 14, "team": "Jordan"},
    {"name": "Nour Al-Rawabdeh", "position": "MF", "jersey_number": 10, "team": "Jordan"},
    # South Korea
    {"name": "Son Heung-min", "position": "FW", "jersey_number": 7, "team": "South Korea"},
    {"name": "Lee Kang-in", "position": "MF", "jersey_number": 18, "team": "South Korea"},
    {"name": "Kim Min-jae", "position": "DF", "jersey_number": 3, "team": "South Korea"},
    # Qatar
    {"name": "Akram Afif", "position": "FW", "jersey_number": 11, "team": "Qatar"},
    {"name": "Almoez Ali", "position": "FW", "jersey_number": 19, "team": "Qatar"},
    {"name": "Saad Al-Sheeb", "position": "GK", "jersey_number": 1, "team": "Qatar"},
    # Saudi Arabia
    {"name": "Salem Al-Dawsari", "position": "FW", "jersey_number": 10, "team": "Saudi Arabia"},
    {"name": "Saleh Al-Shehri", "position": "FW", "jersey_number": 11, "team": "Saudi Arabia"},
    {"name": "Mohamed Kanno", "position": "MF", "jersey_number": 23, "team": "Saudi Arabia"},
    # Uzbekistan
    {"name": "Eldor Shomurodov", "position": "FW", "jersey_number": 9, "team": "Uzbekistan"},
    {"name": "Abbosbek Fayzullaev", "position": "MF", "jersey_number": 10, "team": "Uzbekistan"},
    {"name": "Khojimat Erkinov", "position": "MF", "jersey_number": 8, "team": "Uzbekistan"},
    # Iraq
    {"name": "Aymen Hussein", "position": "FW", "jersey_number": 9, "team": "Iraq"},
    {"name": "Ali Al-Hamadi", "position": "FW", "jersey_number": 11, "team": "Iraq"},
    {"name": "Zidane Iqbal", "position": "MF", "jersey_number": 8, "team": "Iraq"},
    # Algeria
    {"name": "Riyad Mahrez", "position": "FW", "jersey_number": 7, "team": "Algeria"},
    {"name": "Ismaël Bennacer", "position": "MF", "jersey_number": 8, "team": "Algeria"},
    {"name": "Aïssa Mandi", "position": "DF", "jersey_number": 4, "team": "Algeria"},
    # Cabo Verde (stored as "Cabo Verde" in DB)
    {"name": "Ryan Mendes", "position": "FW", "jersey_number": 10, "team": "Cabo Verde"},
    {"name": "Bebé", "position": "FW", "jersey_number": 7, "team": "Cabo Verde"},
    {"name": "Vozinha", "position": "GK", "jersey_number": 1, "team": "Cabo Verde"},
    # Ivory Coast (stored as "Ivory Coast" in DB)
    {"name": "Sébastien Haller", "position": "FW", "jersey_number": 9, "team": "Ivory Coast"},
    {"name": "Franck Kessié", "position": "MF", "jersey_number": 19, "team": "Ivory Coast"},
    {"name": "Serge Aurier", "position": "DF", "jersey_number": 2, "team": "Ivory Coast"},
    # Egypt
    {"name": "Mohamed Salah", "position": "FW", "jersey_number": 10, "team": "Egypt"},
    {"name": "Mohamed Elneny", "position": "MF", "jersey_number": 17, "team": "Egypt"},
    {"name": "Mohamed Abou Gabal", "position": "GK", "jersey_number": 1, "team": "Egypt"},
    # Ghana
    {"name": "Mohammed Kudus", "position": "MF", "jersey_number": 20, "team": "Ghana"},
    {"name": "Thomas Partey", "position": "MF", "jersey_number": 5, "team": "Ghana"},
    {"name": "Jordan Ayew", "position": "FW", "jersey_number": 10, "team": "Ghana"},
    # Morocco
    {"name": "Achraf Hakimi", "position": "DF", "jersey_number": 2, "team": "Morocco"},
    {"name": "Hakim Ziyech", "position": "MF", "jersey_number": 7, "team": "Morocco"},
    {"name": "Yassine Bounou", "position": "GK", "jersey_number": 1, "team": "Morocco"},
    # Senegal
    {"name": "Sadio Mané", "position": "FW", "jersey_number": 10, "team": "Senegal"},
    {"name": "Kalidou Koulibaly", "position": "DF", "jersey_number": 3, "team": "Senegal"},
    {"name": "Édouard Mendy", "position": "GK", "jersey_number": 16, "team": "Senegal"},
    # South Africa
    {"name": "Lyle Foster", "position": "FW", "jersey_number": 11, "team": "South Africa"},
    {"name": "Percy Tau", "position": "FW", "jersey_number": 22, "team": "South Africa"},
    {"name": "Ronwen Williams", "position": "GK", "jersey_number": 1, "team": "South Africa"},
    # Tunisia
    {"name": "Wahbi Khazri", "position": "FW", "jersey_number": 10, "team": "Tunisia"},
    {"name": "Youssef Msakni", "position": "FW", "jersey_number": 7, "team": "Tunisia"},
    {"name": "Aïssa Laïdouni", "position": "MF", "jersey_number": 13, "team": "Tunisia"},
    # DR Congo
    {"name": "Cédric Bakambu", "position": "FW", "jersey_number": 11, "team": "DR Congo"},
    {"name": "Yoane Wissa", "position": "FW", "jersey_number": 9, "team": "DR Congo"},
    {"name": "Chancel Mbemba", "position": "DF", "jersey_number": 4, "team": "DR Congo"},
    # New Zealand
    {"name": "Chris Wood", "position": "FW", "jersey_number": 9, "team": "New Zealand"},
    {"name": "Marko Stamenić", "position": "MF", "jersey_number": 8, "team": "New Zealand"},
    {"name": "Liberato Cacace", "position": "DF", "jersey_number": 3, "team": "New Zealand"},
]


class Command(BaseCommand):
    help = 'Seed players for all World Cup 2026 teams'

    def handle(self, *args, **_):
        for data in PLAYERS:
            team_name = data['team']
            try:
                team = Team.objects.get(name=team_name)
            except Team.DoesNotExist:
                self.stdout.write(self.style.WARNING(f'Team not found: {team_name} — skipping'))
                continue

            player, created = Player.objects.get_or_create(
                name=data['name'],
                team=team,
                defaults={
                    'position': data['position'],
                    'jersey_number': data['jersey_number'],
                },
            )
            status = 'created' if created else 'already exists'
            self.stdout.write(f'{player.name} ({team.name}) — {status}')
