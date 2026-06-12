from django.core.management.base import BaseCommand
from players.models import Player
from teams.models import Team

PLAYERS = [
    {"name": "Raul Rangel", "position": "GK", "jersey_number": 1, "team": "Mexico"},
{"name": "Jorge Sanchez", "position": "DF", "jersey_number": 2, "team": "Mexico"},
{"name": "Cesar Montes", "position": "DF", "jersey_number": 3, "team": "Mexico"},
{"name": "Edson Alvarez", "position": "DF", "jersey_number": 4, "team": "Mexico"},
{"name": "Johan Vasquez", "position": "DF", "jersey_number": 5, "team": "Mexico"},
{"name": "Erik Lira", "position": "MF", "jersey_number": 6, "team": "Mexico"},
{"name": "Luis Romo", "position": "MF", "jersey_number": 7, "team": "Mexico"},
{"name": "Alvaro Fidalgo", "position": "MF", "jersey_number": 8, "team": "Mexico"},
{"name": "Raul Jimenez", "position": "FW", "jersey_number": 9, "team": "Mexico"},
{"name": "Alexis Vega", "position": "FW", "jersey_number": 10, "team": "Mexico"},
{"name": "Santiago Gimenez", "position": "FW", "jersey_number": 11, "team": "Mexico"},
{"name": "Carlos Acevedo", "position": "GK", "jersey_number": 12, "team": "Mexico"},
{"name": "Guillermo Ochoa", "position": "GK", "jersey_number": 13, "team": "Mexico"},
{"name": "Armando Gonzalez", "position": "FW", "jersey_number": 14, "team": "Mexico"},
{"name": "Israel Reyes", "position": "DF", "jersey_number": 15, "team": "Mexico"},
{"name": "Julian Quinones", "position": "FW", "jersey_number": 16, "team": "Mexico"},
{"name": "Orbelin Pineda", "position": "MF", "jersey_number": 17, "team": "Mexico"},
{"name": "Obed Vargas", "position": "MF", "jersey_number": 18, "team": "Mexico"},
{"name": "Gilberto Mora", "position": "MF", "jersey_number": 19, "team": "Mexico"},
{"name": "Mateo Chavez", "position": "DF", "jersey_number": 20, "team": "Mexico"},
{"name": "Cesar Huerta", "position": "FW", "jersey_number": 21, "team": "Mexico"},
{"name": "Guillermo Martinez", "position": "FW", "jersey_number": 22, "team": "Mexico"},
{"name": "Jesus Gallardo", "position": "DF", "jersey_number": 23, "team": "Mexico"},
{"name": "Luis Chavez", "position": "MF", "jersey_number": 24, "team": "Mexico"},
{"name": "Roberto Alvarado", "position": "FW", "jersey_number": 25, "team": "Mexico"},
{"name": "Brian Gutierrez", "position": "MF", "jersey_number": 26, "team": "Mexico"},
  {
    "team": "Czechia",
    "jersey_number": 1,
    "position": "GK",
    "name": "Matej Kovar"
  },
  {
    "team": "Czechia",
    "jersey_number": 2,
    "position": "DF",
    "name": "David Zima"
  },
  {
    "team": "Czechia",
    "jersey_number": 3,
    "position": "DF",
    "name": "Tomas Holes"
  },
  {
    "team": "Czechia",
    "jersey_number": 4,
    "position": "DF",
    "name": "Robin Hranac"
  },
  {
    "team": "Czechia",
    "jersey_number": 5,
    "position": "DF",
    "name": "Vladimir Coufal"
  },
  {
    "team": "Czechia",
    "jersey_number": 6,
    "position": "DF",
    "name": "Stepan Chaloupek"
  },
  {
    "team": "Czechia",
    "jersey_number": 7,
    "position": "DF",
    "name": "Ladislav Krejci (C)"
  },
  {
    "team": "Czechia",
    "jersey_number": 8,
    "position": "MF",
    "name": "Vladimir Darida"
  },
  {
    "team": "Czechia",
    "jersey_number": 9,
    "position": "FW",
    "name": "Adam Hlozek"
  },
  {
    "team": "Czechia",
    "jersey_number": 10,
    "position": "FW",
    "name": "Patrik Schick"
  },
  {
    "team": "Czechia",
    "jersey_number": 11,
    "position": "FW",
    "name": "Jan Kuchta"
  },
  {
    "team": "Czechia",
    "jersey_number": 12,
    "position": "MF",
    "name": "Lukas Cerv"
  },
  {
    "team": "Czechia",
    "jersey_number": 13,
    "position": "FW",
    "name": "Mojmir Chytil"
  },
  {
    "team": "Czechia",
    "jersey_number": 14,
    "position": "DF",
    "name": "David Jurasek"
  },
  {
    "team": "Czechia",
    "jersey_number": 15,
    "position": "FW",
    "name": "Pavel Sulc"
  },
  {
    "team": "Czechia",
    "jersey_number": 16,
    "position": "GK",
    "name": "Jindrich Stanek"
  },
  {
    "team": "Czechia",
    "jersey_number": 17,
    "position": "MF",
    "name": "Lukas Provod"
  },
  {
    "team": "Czechia",
    "jersey_number": 18,
    "position": "MF",
    "name": "Michal Sadilek"
  },
  {
    "team": "Czechia",
    "jersey_number": 19,
    "position": "FW",
    "name": "Tomas Chory"
  },
  {
    "team": "Czechia",
    "jersey_number": 20,
    "position": "DF",
    "name": "Jaroslav Zeleny"
  },
  {
    "team": "Czechia",
    "jersey_number": 21,
    "position": "DF",
    "name": "David Doudera"
  },
  {
    "team": "Czechia",
    "jersey_number": 22,
    "position": "MF",
    "name": "Tomas Soucek"
  },
  {
    "team": "Czechia",
    "jersey_number": 23,
    "position": "GK",
    "name": "Lukas Hornicek"
  },
  {
    "team": "Czechia",
    "jersey_number": 24,
    "position": "MF",
    "name": "Alexandr Sojka"
  },
  {
    "team": "Czechia",
    "jersey_number": 25,
    "position": "MF",
    "name": "Hugo Sochurek"
  },
  {
    "team": "Czechia",
    "jersey_number": 26,
    "position": "FW",
    "name": "Denis Visinsky"
  },
  {
    "team": "South Africa",
    "jersey_number": 1,
    "position": "GK",
    "name": "Ronwen Williams (C)"
  },
  {
    "team": "South Africa",
    "jersey_number": 2,
    "position": "DF",
    "name": "Thabang Matuludi"
  },
  {
    "team": "South Africa",
    "jersey_number": 3,
    "position": "DF",
    "name": "Khulumani Ndamane"
  },
  {
    "team": "South Africa",
    "jersey_number": 4,
    "position": "MF",
    "name": "Teboho Mokoena"
  },
  {
    "team": "South Africa",
    "jersey_number": 5,
    "position": "MF",
    "name": "Thalente Mbatha"
  },
  {
    "team": "South Africa",
    "jersey_number": 6,
    "position": "DF",
    "name": "Aubrey Modiba"
  },
  {
    "team": "South Africa",
    "jersey_number": 7,
    "position": "FW",
    "name": "Oswin Appollis"
  },
  {
    "team": "South Africa",
    "jersey_number": 8,
    "position": "FW",
    "name": "Tshepang Moremi"
  },
  {
    "team": "South Africa",
    "jersey_number": 9,
    "position": "FW",
    "name": "Lyle Foster"
  },
  {
    "team": "South Africa",
    "jersey_number": 10,
    "position": "FW",
    "name": "Relebohile Mofokeng"
  },
  {
    "team": "South Africa",
    "jersey_number": 11,
    "position": "MF",
    "name": "Themba Zwane"
  },
  {
    "team": "South Africa",
    "jersey_number": 12,
    "position": "FW",
    "name": "Thapelo Maseko"
  },
  {
    "team": "South Africa",
    "jersey_number": 13,
    "position": "MF",
    "name": "Sphephelo Sithole"
  },
  {
    "team": "South Africa",
    "jersey_number": 14,
    "position": "DF",
    "name": "Mbekezeli Mbokazi"
  },
  {
    "team": "South Africa",
    "jersey_number": 15,
    "position": "FW",
    "name": "Iqraam Rayners"
  },
  {
    "team": "South Africa",
    "jersey_number": 16,
    "position": "GK",
    "name": "Sipho Chaine"
  },
  {
    "team": "South Africa",
    "jersey_number": 17,
    "position": "FW",
    "name": "Evidence Makgopa"
  },
  {
    "team": "South Africa",
    "jersey_number": 18,
    "position": "DF",
    "name": "Samukele Kabini"
  },
  {
    "team": "South Africa",
    "jersey_number": 19,
    "position": "DF",
    "name": "Nkosinathi Sibisi"
  },
  {
    "team": "South Africa",
    "jersey_number": 20,
    "position": "DF",
    "name": "Khuliso Mudau"
  },
  {
    "team": "South Africa",
    "jersey_number": 21,
    "position": "DF",
    "name": "Ime Okon"
  },
  {
    "team": "South Africa",
    "jersey_number": 22,
    "position": "GK",
    "name": "Ricardo Goss"
  },
  {
    "team": "South Africa",
    "jersey_number": 23,
    "position": "MF",
    "name": "Jayden Adams"
  },
  {
    "team": "South Africa",
    "jersey_number": 24,
    "position": "DF",
    "name": "Olwethu Makhanya"
  },
  {
    "team": "South Africa",
    "jersey_number": 25,
    "position": "FW",
    "name": "Kamogelo Sebelebele"
  },
  {
    "team": "South Africa",
    "jersey_number": 26,
    "position": "DF",
    "name": "Bradley Cross"
  },
  {
    "team": "South Korea",
    "jersey_number": 1,
    "position": "GK",
    "name": "Kim Seung-gyu"
  },
  {
    "team": "South Korea",
    "jersey_number": 2,
    "position": "DF",
    "name": "Lee Han-beom"
  },
  {
    "team": "South Korea",
    "jersey_number": 3,
    "position": "MF",
    "name": "Lee Gi-hyuk"
  },
  {
    "team": "South Korea",
    "jersey_number": 4,
    "position": "DF",
    "name": "Kim Min-jae"
  },
  {
    "team": "South Korea",
    "jersey_number": 5,
    "position": "DF",
    "name": "Kim Tae-hyeon"
  },
  {
    "team": "South Korea",
    "jersey_number": 6,
    "position": "MF",
    "name": "Hwang In-beom"
  },
  {
    "team": "South Korea",
    "jersey_number": 7,
    "position": "FW",
    "name": "Son Heung-min (C)"
  },
  {
    "team": "South Korea",
    "jersey_number": 8,
    "position": "MF",
    "name": "Paik Seung-ho"
  },
  {
    "team": "South Korea",
    "jersey_number": 9,
    "position": "FW",
    "name": "Cho Gue-sung"
  },
  {
    "team": "South Korea",
    "jersey_number": 10,
    "position": "MF",
    "name": "Lee Jae-sung"
  },
  {
    "team": "South Korea",
    "jersey_number": 11,
    "position": "MF",
    "name": "Hwang Hee-chan"
  },
  {
    "team": "South Korea",
    "jersey_number": 12,
    "position": "GK",
    "name": "Song Bum-keun"
  },
  {
    "team": "South Korea",
    "jersey_number": 13,
    "position": "DF",
    "name": "Lee Tae-seok"
  },
  {
    "team": "South Korea",
    "jersey_number": 14,
    "position": "DF",
    "name": "Cho Wi-je"
  },
  {
    "team": "South Korea",
    "jersey_number": 15,
    "position": "DF",
    "name": "Kim Moon-hwan"
  },
  {
    "team": "South Korea",
    "jersey_number": 16,
    "position": "DF",
    "name": "Park Jin-seob"
  },
  {
    "team": "South Korea",
    "jersey_number": 17,
    "position": "MF",
    "name": "Bae Jun-ho"
  },
  {
    "team": "South Korea",
    "jersey_number": 18,
    "position": "FW",
    "name": "Oh Hyeon-gyu"
  },
  {
    "team": "South Korea",
    "jersey_number": 19,
    "position": "MF",
    "name": "Lee Kang-in"
  },
  {
    "team": "South Korea",
    "jersey_number": 20,
    "position": "MF",
    "name": "Yang Hyun-jun"
  },
  {
    "team": "South Korea",
    "jersey_number": 21,
    "position": "GK",
    "name": "Jo Hyeon-woo"
  },
  {
    "team": "South Korea",
    "jersey_number": 22,
    "position": "DF",
    "name": "Seol Young-woo"
  },
  {
    "team": "South Korea",
    "jersey_number": 23,
    "position": "DF",
    "name": "Jens Castrop"
  },
  {
    "team": "South Korea",
    "jersey_number": 24,
    "position": "MF",
    "name": "Kim Jin-gyu"
  },
  {
    "team": "South Korea",
    "jersey_number": 25,
    "position": "MF",
    "name": "Eom Ji-sung"
  },
  {
    "team": "South Korea",
    "jersey_number": 26,
    "position": "MF",
    "name": "Lee Dong-gyeong"
  },
  {
    "team": "Canada",
    "jersey_number": 1,
    "position": "GK",
    "name": "Dayne St. Clair"
  },
  {
    "team": "Canada",
    "jersey_number": 2,
    "position": "DF",
    "name": "Alistair Johnston"
  },
  {
    "team": "Canada",
    "jersey_number": 3,
    "position": "DF",
    "name": "Alfie Jones"
  },
  {
    "team": "Canada",
    "jersey_number": 4,
    "position": "DF",
    "name": "Luc de Fougerolles"
  },
  {
    "team": "Canada",
    "jersey_number": 5,
    "position": "DF",
    "name": "Joel Waterman"
  },
  {
    "team": "Canada",
    "jersey_number": 6,
    "position": "MF",
    "name": "Mathieu Choiniere"
  },
  {
    "team": "Canada",
    "jersey_number": 7,
    "position": "MF",
    "name": "Stephen Eustaquio"
  },
  {
    "team": "Canada",
    "jersey_number": 8,
    "position": "MF",
    "name": "Ismael Kone"
  },
  {
    "team": "Canada",
    "jersey_number": 9,
    "position": "FW",
    "name": "Cyle Larin"
  },
  {
    "team": "Canada",
    "jersey_number": 10,
    "position": "FW",
    "name": "Jonathan David"
  },
  {
    "team": "Canada",
    "jersey_number": 11,
    "position": "MF",
    "name": "Liam Millar"
  },
  {
    "team": "Canada",
    "jersey_number": 12,
    "position": "FW",
    "name": "Tani Oluwaseyi"
  },
  {
    "team": "Canada",
    "jersey_number": 13,
    "position": "DF",
    "name": "Derek Cornelius"
  },
  {
    "team": "Canada",
    "jersey_number": 14,
    "position": "MF",
    "name": "Jacob Shaffelburg"
  },
  {
    "team": "Canada",
    "jersey_number": 15,
    "position": "DF",
    "name": "Moise Bombito"
  },
  {
    "team": "Canada",
    "jersey_number": 16,
    "position": "GK",
    "name": "Maxime Crepeau"
  },
  {
    "team": "Canada",
    "jersey_number": 17,
    "position": "FW",
    "name": "Tajon Buchanan"
  },
  {
    "team": "Canada",
    "jersey_number": 18,
    "position": "GK",
    "name": "Owen Goodman"
  },
  {
    "team": "Canada",
    "jersey_number": 19,
    "position": "DF",
    "name": "Alphonso Davies (C)"
  },
  {
    "team": "Canada",
    "jersey_number": 20,
    "position": "FW",
    "name": "Ali Ahmed"
  },
  {
    "team": "Canada",
    "jersey_number": 21,
    "position": "MF",
    "name": "Jonathan Osorio"
  },
  {
    "team": "Canada",
    "jersey_number": 22,
    "position": "DF",
    "name": "Richie Laryea"
  },
  {
    "team": "Canada",
    "jersey_number": 23,
    "position": "DF",
    "name": "Niko Sigur"
  },
  {
    "team": "Canada",
    "jersey_number": 24,
    "position": "FW",
    "name": "Promise David"
  },
  {
    "team": "Canada",
    "jersey_number": 25,
    "position": "MF",
    "name": "Nathan Saliba"
  },
  {
    "team": "Bosnia",
    "jersey_number": 1,
    "position": "GK",
    "name": "Nikola Vasilj"
  },
  {
    "team": "Bosnia",
    "jersey_number": 2,
    "position": "DF",
    "name": "Nihad Mujakic"
  },
  {
    "team": "Bosnia",
    "jersey_number": 3,
    "position": "DF",
    "name": "Dennis Hadzikadunic"
  },
  {
    "team": "Bosnia",
    "jersey_number": 4,
    "position": "DF",
    "name": "Tarik Muharemovic"
  },
  {
    "team": "Bosnia",
    "jersey_number": 5,
    "position": "DF",
    "name": "Sead Kolasinac"
  },
  {
    "team": "Bosnia",
    "jersey_number": 6,
    "position": "MF",
    "name": "Benjamin Tahirovic"
  },
  {
    "team": "Bosnia",
    "jersey_number": 7,
    "position": "DF",
    "name": "Amar Dedic"
  },
  {
    "team": "Bosnia",
    "jersey_number": 8,
    "position": "MF",
    "name": "Armin Gigovic"
  },
  {
    "team": "Bosnia",
    "jersey_number": 9,
    "position": "FW",
    "name": "Samed Bazdar"
  },
  {
    "team": "Bosnia",
    "jersey_number": 10,
    "position": "FW",
    "name": "Ermedin Demirovic"
  },
  {
    "team": "Bosnia",
    "jersey_number": 11,
    "position": "FW",
    "name": "Edin Dzeko (C)"
  },
  {
    "team": "Bosnia",
    "jersey_number": 12,
    "position": "GK",
    "name": "Mladen Jurkas"
  },
  {
    "team": "Bosnia",
    "jersey_number": 13,
    "position": "MF",
    "name": "Ivan Basic"
  },
  {
    "team": "Bosnia",
    "jersey_number": 14,
    "position": "MF",
    "name": "Ivan Sunjic"
  },
  {
    "team": "Bosnia",
    "jersey_number": 15,
    "position": "MF",
    "name": "Amar Memic"
  },
  {
    "team": "Bosnia",
    "jersey_number": 16,
    "position": "MF",
    "name": "Amir Hadziahmetovic"
  },
  {
    "team": "Bosnia",
    "jersey_number": 17,
    "position": "MF",
    "name": "Dzenis Burnic"
  },
  {
    "team": "Bosnia",
    "jersey_number": 18,
    "position": "DF",
    "name": "Nikola Katic"
  },
  {
    "team": "Bosnia",
    "jersey_number": 19,
    "position": "FW",
    "name": "Kerim Alajbegovic"
  },
  {
    "team": "Bosnia",
    "jersey_number": 20,
    "position": "FW",
    "name": "Esmir Bajraktarevic"
  },
  {
    "team": "Bosnia",
    "jersey_number": 21,
    "position": "DF",
    "name": "Stjepan Radeljic"
  },
  {
    "team": "Bosnia",
    "jersey_number": 22,
    "position": "GK",
    "name": "Martin Zlomislic"
  },
  {
    "team": "Bosnia",
    "jersey_number": 23,
    "position": "FW",
    "name": "Haris Tabakovic"
  },
  {
    "team": "Bosnia",
    "jersey_number": 24,
    "position": "DF",
    "name": "Nidal Celik"
  },
  {
    "team": "Bosnia",
    "jersey_number": 25,
    "position": "FW",
    "name": "Jovo Lukic"
  },
  {
    "team": "Bosnia",
    "jersey_number": 26,
    "position": "MF",
    "name": "Ermin Mahmic"
  },
  {
    "team": "Qatar",
    "jersey_number": 1,
    "position": "GK",
    "name": "Mahmud Abunada"
  },
  {
    "team": "Qatar",
    "jersey_number": 2,
    "position": "DF",
    "name": "Pedro Miguel"
  },
  {
    "team": "Qatar",
    "jersey_number": 3,
    "position": "DF",
    "name": "Lucas Mendes"
  },
  {
    "team": "Qatar",
    "jersey_number": 4,
    "position": "DF",
    "name": "Issa Laye"
  },
  {
    "team": "Qatar",
    "jersey_number": 5,
    "position": "DF",
    "name": "Jassem Gaber"
  },
  {
    "team": "Qatar",
    "jersey_number": 6,
    "position": "MF",
    "name": "Abdulaziz Hatem"
  },
  {
    "team": "Qatar",
    "jersey_number": 7,
    "position": "FW",
    "name": "Ahmed Alaaeldin"
  },
  {
    "team": "Qatar",
    "jersey_number": 8,
    "position": "FW",
    "name": "Edmilson Junior"
  },
  {
    "team": "Qatar",
    "jersey_number": 9,
    "position": "FW",
    "name": "Mohammed Muntari"
  },
  {
    "team": "Qatar",
    "jersey_number": 10,
    "position": "FW",
    "name": "Hassan Al-Haydos (C)"
  },
  {
    "team": "Qatar",
    "jersey_number": 11,
    "position": "FW",
    "name": "Akram Afif"
  },
  {
    "team": "Qatar",
    "jersey_number": 12,
    "position": "MF",
    "name": "Karim Boudiaf"
  },
  {
    "team": "Qatar",
    "jersey_number": 13,
    "position": "DF",
    "name": "Ayoub Al-Oui"
  },
  {
    "team": "Qatar",
    "jersey_number": 14,
    "position": "DF",
    "name": "Homam Ahmed"
  },
  {
    "team": "Qatar",
    "jersey_number": 15,
    "position": "FW",
    "name": "Yusuf Abdurisag"
  },
  {
    "team": "Qatar",
    "jersey_number": 16,
    "position": "DF",
    "name": "Boualem Khoukhi"
  },
  {
    "team": "Qatar",
    "jersey_number": 17,
    "position": "MF",
    "name": "Ahmed Al-Ganehi"
  },
  {
    "team": "Qatar",
    "jersey_number": 18,
    "position": "DF",
    "name": "Sultan Al-Brake"
  },
  {
    "team": "Qatar",
    "jersey_number": 19,
    "position": "FW",
    "name": "Almoez Ali"
  },
  {
    "team": "Qatar",
    "jersey_number": 20,
    "position": "MF",
    "name": "Ahmed Fathy"
  },
  {
    "team": "Qatar",
    "jersey_number": 21,
    "position": "GK",
    "name": "Salah Zakaria"
  },
  {
    "team": "Qatar",
    "jersey_number": 22,
    "position": "GK",
    "name": "Meshaal Barsham"
  },
  {
    "team": "Qatar",
    "jersey_number": 23,
    "position": "MF",
    "name": "Assim Madibo"
  },
  {
    "team": "Qatar",
    "jersey_number": 24,
    "position": "FW",
    "name": "Tahsin Jamshid"
  },
  {
    "team": "Qatar",
    "jersey_number": 25,
    "position": "DF",
    "name": "Al-Hashmi Al-Hussain"
  },
  {
    "team": "Qatar",
    "jersey_number": 26,
    "position": "FW",
    "name": "Mohamed Manai"
  },
  {
    "team": "Switzerland",
    "jersey_number": 1,
    "position": "GK",
    "name": "Gregor Kobel"
  },
  {
    "team": "Switzerland",
    "jersey_number": 2,
    "position": "DF",
    "name": "Miro Muheim"
  },
  {
    "team": "Switzerland",
    "jersey_number": 3,
    "position": "DF",
    "name": "Silvan Widmer"
  },
  {
    "team": "Switzerland",
    "jersey_number": 4,
    "position": "DF",
    "name": "Nico Elvedi"
  },
  {
    "team": "Switzerland",
    "jersey_number": 5,
    "position": "DF",
    "name": "Manuel Akanji"
  },
  {
    "team": "Switzerland",
    "jersey_number": 6,
    "position": "MF",
    "name": "Denis Zakaria"
  },
  {
    "team": "Switzerland",
    "jersey_number": 7,
    "position": "FW",
    "name": "Breel Embolo"
  },
  {
    "team": "Switzerland",
    "jersey_number": 8,
    "position": "MF",
    "name": "Remo Freuler"
  },
  {
    "team": "Switzerland",
    "jersey_number": 9,
    "position": "MF",
    "name": "Johan Manzambi"
  },
  {
    "team": "Switzerland",
    "jersey_number": 10,
    "position": "MF",
    "name": "Granit Xhaka (C)"
  },
  {
    "team": "Switzerland",
    "jersey_number": 11,
    "position": "FW",
    "name": "Dan Ndoye"
  },
  {
    "team": "Switzerland",
    "jersey_number": 12,
    "position": "GK",
    "name": "Yvon Mvogo"
  },
  {
    "team": "Switzerland",
    "jersey_number": 13,
    "position": "DF",
    "name": "Ricardo Rodriguez"
  },
  {
    "team": "Switzerland",
    "jersey_number": 14,
    "position": "MF",
    "name": "Ardon Jashari"
  },
  {
    "team": "Switzerland",
    "jersey_number": 15,
    "position": "MF",
    "name": "Djibril Sow"
  },
  {
    "team": "Switzerland",
    "jersey_number": 16,
    "position": "FW",
    "name": "Christian Fassnacht"
  },
  {
    "team": "Switzerland",
    "jersey_number": 17,
    "position": "FW",
    "name": "Ruben Vargas"
  },
  {
    "team": "Switzerland",
    "jersey_number": 18,
    "position": "DF",
    "name": "Eray Comert"
  },
  {
    "team": "Switzerland",
    "jersey_number": 19,
    "position": "FW",
    "name": "Noah Okafor"
  },
  {
    "team": "Switzerland",
    "jersey_number": 20,
    "position": "MF",
    "name": "Michel Aebischer"
  },
  {
    "team": "Switzerland",
    "jersey_number": 21,
    "position": "GK",
    "name": "Marvin Keller"
  },
  {
    "team": "Switzerland",
    "jersey_number": 22,
    "position": "MF",
    "name": "Fabian Rieder"
  },
  {
    "team": "Switzerland",
    "jersey_number": 23,
    "position": "FW",
    "name": "Zeki Amdouni"
  },
  {
    "team": "Switzerland",
    "jersey_number": 24,
    "position": "DF",
    "name": "Aurele Amenda"
  },
  {
    "team": "Switzerland",
    "jersey_number": 25,
    "position": "DF",
    "name": "Luca Jaquez"
  },
  {
    "team": "Switzerland",
    "jersey_number": 26,
    "position": "FW",
    "name": "Cedric Itten"
  },
  {
    "team": "Brazil",
    "jersey_number": 1,
    "position": "GK",
    "name": "Alisson"
  },
  {
    "team": "Brazil",
    "jersey_number": 2,
    "position": "MF",
    "name": "Ederson Silva"
  },
  {
    "team": "Brazil",
    "jersey_number": 3,
    "position": "DF",
    "name": "Gabriel Magalhaes"
  },
  {
    "team": "Brazil",
    "jersey_number": 4,
    "position": "DF",
    "name": "Marquinhos (C)"
  },
  {
    "team": "Brazil",
    "jersey_number": 5,
    "position": "MF",
    "name": "Casemiro"
  },
  {
    "team": "Brazil",
    "jersey_number": 6,
    "position": "DF",
    "name": "Alex Sandro"
  },
  {
    "team": "Brazil",
    "jersey_number": 7,
    "position": "FW",
    "name": "Vinicius Junior"
  },
  {
    "team": "Brazil",
    "jersey_number": 8,
    "position": "MF",
    "name": "Bruno Guimaraes"
  },
  {
    "team": "Brazil",
    "jersey_number": 9,
    "position": "FW",
    "name": "Matheus Cunha"
  },
  {
    "team": "Brazil",
    "jersey_number": 10,
    "position": "FW",
    "name": "Neymar"
  },
  {
    "team": "Brazil",
    "jersey_number": 11,
    "position": "FW",
    "name": "Raphinha"
  },
  {
    "team": "Brazil",
    "jersey_number": 12,
    "position": "GK",
    "name": "Weverton"
  },
  {
    "team": "Brazil",
    "jersey_number": 13,
    "position": "DF",
    "name": "Danilo Luiz"
  },
  {
    "team": "Brazil",
    "jersey_number": 14,
    "position": "DF",
    "name": "Bremer"
  },
  {
    "team": "Brazil",
    "jersey_number": 15,
    "position": "DF",
    "name": "Leo Pereira"
  },
  {
    "team": "Brazil",
    "jersey_number": 16,
    "position": "DF",
    "name": "Douglas Santos"
  },
  {
    "team": "Brazil",
    "jersey_number": 17,
    "position": "MF",
    "name": "Fabinho"
  },
  {
    "team": "Brazil",
    "jersey_number": 18,
    "position": "MF",
    "name": "Danilo Santos"
  },
  {
    "team": "Brazil",
    "jersey_number": 19,
    "position": "FW",
    "name": "Endrick"
  },
  {
    "team": "Brazil",
    "jersey_number": 20,
    "position": "MF",
    "name": "Lucas Paqueta"
  },
  {
    "team": "Brazil",
    "jersey_number": 21,
    "position": "FW",
    "name": "Luiz Henrique"
  },
  {
    "team": "Brazil",
    "jersey_number": 22,
    "position": "FW",
    "name": "Gabriel Martinelli"
  },
  {
    "team": "Brazil",
    "jersey_number": 23,
    "position": "GK",
    "name": "Ederson Moraes"
  },
  {
    "team": "Brazil",
    "jersey_number": 24,
    "position": "DF",
    "name": "Roger Ibanez"
  },
  {
    "team": "Brazil",
    "jersey_number": 25,
    "position": "FW",
    "name": "Igor Thiago"
  },
  {
    "team": "Brazil",
    "jersey_number": 26,
    "position": "FW",
    "name": "Rayan"
  },
  {
    "team": "Haiti",
    "jersey_number": 1,
    "position": "GK",
    "name": "Johny Placide (C)"
  },
  {
    "team": "Haiti",
    "jersey_number": 2,
    "position": "DF",
    "name": "Carlens Arcus"
  },
  {
    "team": "Haiti",
    "jersey_number": 3,
    "position": "DF",
    "name": "Keeto Thermoncy"
  },
  {
    "team": "Haiti",
    "jersey_number": 4,
    "position": "DF",
    "name": "Ricardo Ade"
  },
  {
    "team": "Haiti",
    "jersey_number": 5,
    "position": "DF",
    "name": "Hannes Delcroix"
  },
  {
    "team": "Haiti",
    "jersey_number": 6,
    "position": "MF",
    "name": "Carl Sainte"
  },
  {
    "team": "Haiti",
    "jersey_number": 7,
    "position": "FW",
    "name": "Derrick Etienne Jr."
  },
  {
    "team": "Haiti",
    "jersey_number": 8,
    "position": "DF",
    "name": "Martin Experience"
  },
  {
    "team": "Haiti",
    "jersey_number": 9,
    "position": "FW",
    "name": "Duckens Nazon"
  },
  {
    "team": "Haiti",
    "jersey_number": 10,
    "position": "MF",
    "name": "Jean-Ricner Bellegarde"
  },
  {
    "team": "Haiti",
    "jersey_number": 11,
    "position": "FW",
    "name": "Louicius Deedson"
  },
  {
    "team": "Haiti",
    "jersey_number": 12,
    "position": "GK",
    "name": "Alexandre Pierre"
  },
  {
    "team": "Haiti",
    "jersey_number": 13,
    "position": "DF",
    "name": "Duke Lacroix"
  },
  {
    "team": "Haiti",
    "jersey_number": 14,
    "position": "MF",
    "name": "Leverton Pierre"
  },
  {
    "team": "Haiti",
    "jersey_number": 15,
    "position": "FW",
    "name": "Ruben Providence"
  },
  {
    "team": "Haiti",
    "jersey_number": 16,
    "position": "FW",
    "name": "Lenny Joseph"
  },
  {
    "team": "Haiti",
    "jersey_number": 17,
    "position": "MF",
    "name": "Danley Jean Jacques"
  },
  {
    "team": "Haiti",
    "jersey_number": 18,
    "position": "FW",
    "name": "Wilson Isidor"
  },
  {
    "team": "Haiti",
    "jersey_number": 19,
    "position": "FW",
    "name": "Yassin Fortune"
  },
  {
    "team": "Haiti",
    "jersey_number": 20,
    "position": "FW",
    "name": "Frantzdy Pierrot"
  },
  {
    "team": "Haiti",
    "jersey_number": 21,
    "position": "FW",
    "name": "Josue Casimir"
  },
  {
    "team": "Haiti",
    "jersey_number": 22,
    "position": "DF",
    "name": "Jean-Kevin Duverne"
  },
  {
    "team": "Haiti",
    "jersey_number": 23,
    "position": "GK",
    "name": "Josue Duverger"
  },
  {
    "team": "Haiti",
    "jersey_number": 24,
    "position": "DF",
    "name": "Wilguens Paugain"
  },
  {
    "team": "Haiti",
    "jersey_number": 25,
    "position": "MF",
    "name": "Dominique Simon"
  },
  {
    "team": "Haiti",
    "jersey_number": 26,
    "position": "MF",
    "name": "Woodensky Pierre"
  },
  {
    "team": "Morocco",
    "jersey_number": 1,
    "position": "GK",
    "name": "Yassine Bounou"
  },
  {
    "team": "Morocco",
    "jersey_number": 2,
    "position": "DF",
    "name": "Achraf Hakimi (C)"
  },
  {
    "team": "Morocco",
    "jersey_number": 3,
    "position": "DF",
    "name": "Noussair Mazraoui"
  },
  {
    "team": "Morocco",
    "jersey_number": 4,
    "position": "MF",
    "name": "Sofyan Amrabat"
  },
  {
    "team": "Morocco",
    "jersey_number": 5,
    "position": "DF",
    "name": "Nayef Aguerd"
  },
  {
    "team": "Morocco",
    "jersey_number": 6,
    "position": "MF",
    "name": "Ayyoub Bouaddi"
  },
  {
    "team": "Morocco",
    "jersey_number": 7,
    "position": "MF",
    "name": "Chemsdine Talbi"
  },
  {
    "team": "Morocco",
    "jersey_number": 8,
    "position": "MF",
    "name": "Azzedine Ounahi"
  },
  {
    "team": "Morocco",
    "jersey_number": 9,
    "position": "FW",
    "name": "Soufiane Rahimi"
  },
  {
    "team": "Morocco",
    "jersey_number": 10,
    "position": "FW",
    "name": "Brahim Diaz"
  },
  {
    "team": "Morocco",
    "jersey_number": 11,
    "position": "MF",
    "name": "Ismael Saibari"
  },
  {
    "team": "Morocco",
    "jersey_number": 12,
    "position": "GK",
    "name": "Munir Mohamedi"
  },
  {
    "team": "Morocco",
    "jersey_number": 13,
    "position": "DF",
    "name": "Zakaria El Ouahdi"
  },
  {
    "team": "Morocco",
    "jersey_number": 14,
    "position": "DF",
    "name": "Issa Diop"
  },
  {
    "team": "Morocco",
    "jersey_number": 15,
    "position": "MF",
    "name": "Samir El Mourabet"
  },
  {
    "team": "Morocco",
    "jersey_number": 16,
    "position": "MF",
    "name": "Gessime Yassine"
  },
  {
    "team": "Morocco",
    "jersey_number": 17,
    "position": "FW",
    "name": "Abde Ezzalzouli"
  },
  {
    "team": "Morocco",
    "jersey_number": 18,
    "position": "DF",
    "name": "Chadi Riad"
  },
  {
    "team": "Morocco",
    "jersey_number": 19,
    "position": "DF",
    "name": "Youssef Belammari"
  },
  {
    "team": "Morocco",
    "jersey_number": 20,
    "position": "FW",
    "name": "Ayoub El Kaabi"
  },
  {
    "team": "Morocco",
    "jersey_number": 21,
    "position": "FW",
    "name": "Ayoube Amaimouni"
  },
  {
    "team": "Morocco",
    "jersey_number": 22,
    "position": "GK",
    "name": "Ahmed Reda Tagnaouti"
  },
  {
    "team": "Morocco",
    "jersey_number": 23,
    "position": "MF",
    "name": "Bilal El Khannouss"
  },
  {
    "team": "Morocco",
    "jersey_number": 24,
    "position": "MF",
    "name": "Neil El Aynaoui"
  },
  {
    "team": "Morocco",
    "jersey_number": 25,
    "position": "DF",
    "name": "Redouane Halhal"
  },
  {
    "team": "Morocco",
    "jersey_number": 26,
    "position": "DF",
    "name": "Anass Salah-Eddine"
  },
  {
    "team": "Scotland",
    "jersey_number": 1,
    "position": "GK",
    "name": "Angus Gunn"
  },
  {
    "team": "Scotland",
    "jersey_number": 2,
    "position": "DF",
    "name": "Aaron Hickey"
  },
  {
    "team": "Scotland",
    "jersey_number": 3,
    "position": "DF",
    "name": "Andy Robertson (C)"
  },
  {
    "team": "Scotland",
    "jersey_number": 4,
    "position": "MF",
    "name": "Scott McTominay"
  },
  {
    "team": "Scotland",
    "jersey_number": 5,
    "position": "DF",
    "name": "Grant Hanley"
  },
  {
    "team": "Scotland",
    "jersey_number": 6,
    "position": "DF",
    "name": "Kieran Tierney"
  },
  {
    "team": "Scotland",
    "jersey_number": 7,
    "position": "MF",
    "name": "John McGinn"
  },
  {
    "team": "Scotland",
    "jersey_number": 8,
    "position": "MF",
    "name": "Tyler Fletcher"
  },
  {
    "team": "Scotland",
    "jersey_number": 9,
    "position": "FW",
    "name": "Lyndon Dykes"
  },
  {
    "team": "Scotland",
    "jersey_number": 10,
    "position": "FW",
    "name": "Che Adams"
  },
  {
    "team": "Scotland",
    "jersey_number": 11,
    "position": "MF",
    "name": "Ryan Christie"
  },
  {
    "team": "Scotland",
    "jersey_number": 12,
    "position": "GK",
    "name": "Liam Kelly"
  },
  {
    "team": "Scotland",
    "jersey_number": 13,
    "position": "DF",
    "name": "Jack Hendry"
  },
  {
    "team": "Scotland",
    "jersey_number": 14,
    "position": "FW",
    "name": "Ross Stewart"
  },
  {
    "team": "Scotland",
    "jersey_number": 15,
    "position": "DF",
    "name": "John Souttar"
  },
  {
    "team": "Scotland",
    "jersey_number": 16,
    "position": "DF",
    "name": "Dominic Hyam"
  },
  {
    "team": "Scotland",
    "jersey_number": 17,
    "position": "FW",
    "name": "Ben Gannon-Doak"
  },
  {
    "team": "Scotland",
    "jersey_number": 18,
    "position": "FW",
    "name": "George Hirst"
  },
  {
    "team": "Scotland",
    "jersey_number": 19,
    "position": "MF",
    "name": "Lewis Ferguson"
  },
  {
    "team": "Scotland",
    "jersey_number": 20,
    "position": "FW",
    "name": "Lawrence Shankland"
  },
  {
    "team": "Scotland",
    "jersey_number": 21,
    "position": "GK",
    "name": "Craig Gordon"
  },
  {
    "team": "Scotland",
    "jersey_number": 22,
    "position": "DF",
    "name": "Nathan Patterson"
  },
  {
    "team": "Scotland",
    "jersey_number": 23,
    "position": "MF",
    "name": "Kenny McLean"
  },
  {
    "team": "Scotland",
    "jersey_number": 24,
    "position": "DF",
    "name": "Anthony Ralston"
  },
  {
    "team": "Scotland",
    "jersey_number": 25,
    "position": "FW",
    "name": "Findlay Curtis"
  },
  {
    "team": "Scotland",
    "jersey_number": 26,
    "position": "DF",
    "name": "Scott McKenna"
  },
  {
    "team": "Australia",
    "jersey_number": 1,
    "position": "GK",
    "name": "Mathew Ryan (C)"
  },
  {
    "team": "Australia",
    "jersey_number": 2,
    "position": "DF",
    "name": "Milos Degenek"
  },
  {
    "team": "Australia",
    "jersey_number": 3,
    "position": "DF",
    "name": "Alessandro Circati"
  },
  {
    "team": "Australia",
    "jersey_number": 4,
    "position": "DF",
    "name": "Jacob Italiano"
  },
  {
    "team": "Australia",
    "jersey_number": 5,
    "position": "DF",
    "name": "Jordan Bos"
  },
  {
    "team": "Australia",
    "jersey_number": 6,
    "position": "DF",
    "name": "Jason Geria"
  },
  {
    "team": "Australia",
    "jersey_number": 7,
    "position": "FW",
    "name": "Mathew Leckie"
  },
  {
    "team": "Australia",
    "jersey_number": 8,
    "position": "MF",
    "name": "Connor Metcalfe"
  },
  {
    "team": "Australia",
    "jersey_number": 9,
    "position": "FW",
    "name": "Mohamed Toure"
  },
  {
    "team": "Australia",
    "jersey_number": 10,
    "position": "FW",
    "name": "Ajdin Hrustic"
  },
  {
    "team": "Australia",
    "jersey_number": 11,
    "position": "FW",
    "name": "Awer Mabil"
  },
  {
    "team": "Australia",
    "jersey_number": 12,
    "position": "GK",
    "name": "Paul Izzo"
  },
  {
    "team": "Australia",
    "jersey_number": 13,
    "position": "MF",
    "name": "Aiden O'Neill"
  },
  {
    "team": "Australia",
    "jersey_number": 14,
    "position": "MF",
    "name": "Cammy Devlin"
  },
  {
    "team": "Australia",
    "jersey_number": 15,
    "position": "DF",
    "name": "Kai Trewin"
  },
  {
    "team": "Australia",
    "jersey_number": 16,
    "position": "DF",
    "name": "Aziz Behich"
  },
  {
    "team": "Australia",
    "jersey_number": 17,
    "position": "FW",
    "name": "Nestory Irankunda"
  },
  {
    "team": "Australia",
    "jersey_number": 18,
    "position": "GK",
    "name": "Patrick Beach"
  },
  {
    "team": "Australia",
    "jersey_number": 19,
    "position": "DF",
    "name": "Harry Souttar"
  },
  {
    "team": "Australia",
    "jersey_number": 20,
    "position": "FW",
    "name": "Cristian Volpato"
  },
  {
    "team": "Australia",
    "jersey_number": 21,
    "position": "DF",
    "name": "Cameron Burgess"
  },
  {
    "team": "Australia",
    "jersey_number": 22,
    "position": "MF",
    "name": "Jackson Irvine"
  },
  {
    "team": "Australia",
    "jersey_number": 23,
    "position": "FW",
    "name": "Nishan Velupillay"
  },
  {
    "team": "Australia",
    "jersey_number": 24,
    "position": "MF",
    "name": "Paul Okon-Engstler"
  },
  {
    "team": "Australia",
    "jersey_number": 25,
    "position": "DF",
    "name": "Lucas Herrington"
  },
  {
    "team": "Australia",
    "jersey_number": 26,
    "position": "FW",
    "name": "Tete Yengi"
  },
  {
    "team": "Paraguay",
    "jersey_number": 1,
    "position": "GK",
    "name": "Gatito Fernandez"
  },
  {
    "team": "Paraguay",
    "jersey_number": 2,
    "position": "DF",
    "name": "Gustavo Velazquez"
  },
  {
    "team": "Paraguay",
    "jersey_number": 3,
    "position": "DF",
    "name": "Omar Alderete"
  },
  {
    "team": "Paraguay",
    "jersey_number": 4,
    "position": "DF",
    "name": "Juan Jose Caceres"
  },
  {
    "team": "Paraguay",
    "jersey_number": 5,
    "position": "DF",
    "name": "Fabian Balbuena"
  },
  {
    "team": "Paraguay",
    "jersey_number": 6,
    "position": "DF",
    "name": "Junior Alonso"
  },
  {
    "team": "Paraguay",
    "jersey_number": 7,
    "position": "MF",
    "name": "Ramon Sosa"
  },
  {
    "team": "Paraguay",
    "jersey_number": 8,
    "position": "MF",
    "name": "Diego Gomez"
  },
  {
    "team": "Paraguay",
    "jersey_number": 9,
    "position": "FW",
    "name": "Antonio Sanabria"
  },
  {
    "team": "Paraguay",
    "jersey_number": 10,
    "position": "MF",
    "name": "Miguel Almiron"
  },
  {
    "team": "Paraguay",
    "jersey_number": 11,
    "position": "MF",
    "name": "Mauricio"
  },
  {
    "team": "Paraguay",
    "jersey_number": 12,
    "position": "GK",
    "name": "Orlando Gill"
  },
  {
    "team": "Paraguay",
    "jersey_number": 13,
    "position": "DF",
    "name": "Jose Canale"
  },
  {
    "team": "Paraguay",
    "jersey_number": 14,
    "position": "MF",
    "name": "Andres Cubas"
  },
  {
    "team": "Paraguay",
    "jersey_number": 15,
    "position": "DF",
    "name": "Gustavo Gomez (C)"
  },
  {
    "team": "Paraguay",
    "jersey_number": 16,
    "position": "MF",
    "name": "Damian Bobadilla"
  },
  {
    "team": "Paraguay",
    "jersey_number": 17,
    "position": "FW",
    "name": "Kaku"
  },
  {
    "team": "Paraguay",
    "jersey_number": 18,
    "position": "FW",
    "name": "Alex Arce"
  },
  {
    "team": "Paraguay",
    "jersey_number": 19,
    "position": "FW",
    "name": "Julio Enciso"
  },
  {
    "team": "Paraguay",
    "jersey_number": 20,
    "position": "MF",
    "name": "Braian Ojeda"
  },
  {
    "team": "Paraguay",
    "jersey_number": 21,
    "position": "FW",
    "name": "Gabriel Avalos"
  },
  {
    "team": "Paraguay",
    "jersey_number": 22,
    "position": "GK",
    "name": "Gaston Olveira"
  },
  {
    "team": "Paraguay",
    "jersey_number": 23,
    "position": "MF",
    "name": "Matias Galarza"
  },
  {
    "team": "Paraguay",
    "jersey_number": 24,
    "position": "MF",
    "name": "Gustavo Caballero"
  },
  {
    "team": "Paraguay",
    "jersey_number": 25,
    "position": "FW",
    "name": "Isidro Pitta"
  },
  {
    "team": "Paraguay",
    "jersey_number": 26,
    "position": "DF",
    "name": "Alexandro Maidana"
  },
  {
    "team": "Turkey",
    "jersey_number": 1,
    "position": "GK",
    "name": "Mert Gunok"
  },
  {
    "team": "Turkey",
    "jersey_number": 2,
    "position": "DF",
    "name": "Zeki Celik"
  },
  {
    "team": "Turkey",
    "jersey_number": 3,
    "position": "DF",
    "name": "Merih Demiral"
  },
  {
    "team": "Turkey",
    "jersey_number": 4,
    "position": "DF",
    "name": "Caglar Soyuncu"
  },
  {
    "team": "Turkey",
    "jersey_number": 5,
    "position": "MF",
    "name": "Salih Ozcan"
  },
  {
    "team": "Turkey",
    "jersey_number": 6,
    "position": "MF",
    "name": "Orkun Kokcu"
  },
  {
    "team": "Turkey",
    "jersey_number": 7,
    "position": "FW",
    "name": "Kerem Akturkoglu"
  },
  {
    "team": "Turkey",
    "jersey_number": 8,
    "position": "FW",
    "name": "Arda Guler"
  },
  {
    "team": "Turkey",
    "jersey_number": 9,
    "position": "FW",
    "name": "Deniz Gul"
  },
  {
    "team": "Turkey",
    "jersey_number": 10,
    "position": "MF",
    "name": "Hakan Calhanoglu (C)"
  },
  {
    "team": "Turkey",
    "jersey_number": 11,
    "position": "FW",
    "name": "Kenan Yıldız"
  },
  {
    "team": "Turkey",
    "jersey_number": 12,
    "position": "GK",
    "name": "Altay Bayındır"
  },
  {
    "team": "Turkey",
    "jersey_number": 13,
    "position": "DF",
    "name": "Eren Elmalı"
  },
  {
    "team": "Turkey",
    "jersey_number": 14,
    "position": "DF",
    "name": "Abdulkerim Bardakcı"
  },
  {
    "team": "Turkey",
    "jersey_number": 15,
    "position": "DF",
    "name": "Ozan Kabak"
  },
  {
    "team": "Turkey",
    "jersey_number": 16,
    "position": "MF",
    "name": "Ismail Yuksek"
  },
  {
    "team": "Turkey",
    "jersey_number": 17,
    "position": "FW",
    "name": "Irfan Can Kahveci"
  },
  {
    "team": "Turkey",
    "jersey_number": 18,
    "position": "DF",
    "name": "Mert Muldur"
  },
  {
    "team": "Turkey",
    "jersey_number": 19,
    "position": "FW",
    "name": "Yunus Akgun"
  },
  {
    "team": "Turkey",
    "jersey_number": 20,
    "position": "DF",
    "name": "Ferdi Kadıoglu"
  },
  {
    "team": "Turkey",
    "jersey_number": 21,
    "position": "FW",
    "name": "Barıs Alper Yılmaz"
  },
  {
    "team": "Turkey",
    "jersey_number": 22,
    "position": "MF",
    "name": "Kaan Ayhan"
  },
  {
    "team": "Turkey",
    "jersey_number": 23,
    "position": "GK",
    "name": "Ugurcan Cakır"
  },
  {
    "team": "Turkey",
    "jersey_number": 24,
    "position": "FW",
    "name": "Oguz Aydın"
  },
  {
    "team": "Turkey",
    "jersey_number": 25,
    "position": "DF",
    "name": "Samet Akaydin"
  },
  {
    "team": "Turkey",
    "jersey_number": 26,
    "position": "FW",
    "name": "Can Uzun"
  },
  {
    "team": "United States",
    "jersey_number": 1,
    "position": "GK",
    "name": "Matt Turner"
  },
  {
    "team": "United States",
    "jersey_number": 2,
    "position": "DF",
    "name": "Sergino Dest"
  },
  {
    "team": "United States",
    "jersey_number": 3,
    "position": "DF",
    "name": "Chris Richards"
  },
  {
    "team": "United States",
    "jersey_number": 4,
    "position": "MF",
    "name": "Tyler Adams"
  },
  {
    "team": "United States",
    "jersey_number": 5,
    "position": "DF",
    "name": "Antonee Robinson"
  },
  {
    "team": "United States",
    "jersey_number": 6,
    "position": "DF",
    "name": "Auston Trusty"
  },
  {
    "team": "United States",
    "jersey_number": 7,
    "position": "MF",
    "name": "Giovanni Reyna"
  },
  {
    "team": "United States",
    "jersey_number": 8,
    "position": "MF",
    "name": "Weston McKennie"
  },
  {
    "team": "United States",
    "jersey_number": 9,
    "position": "FW",
    "name": "Ricardo Pepi"
  },
  {
    "team": "United States",
    "jersey_number": 10,
    "position": "FW",
    "name": "Christian Pulisic"
  },
  {
    "team": "United States",
    "jersey_number": 11,
    "position": "FW",
    "name": "Brenden Aaronson"
  },
  {
    "team": "United States",
    "jersey_number": 12,
    "position": "DF",
    "name": "Miles Robinson"
  },
  {
    "team": "United States",
    "jersey_number": 13,
    "position": "DF",
    "name": "Tim Ream (C)"
  },
  {
    "team": "United States",
    "jersey_number": 14,
    "position": "MF",
    "name": "Sebastian Berhalter"
  },
  {
    "team": "United States",
    "jersey_number": 15,
    "position": "MF",
    "name": "Cristian Roldan"
  },
  {
    "team": "United States",
    "jersey_number": 16,
    "position": "DF",
    "name": "Alex Freeman"
  },
  {
    "team": "United States",
    "jersey_number": 17,
    "position": "MF",
    "name": "Malik Tillman"
  },
  {
    "team": "United States",
    "jersey_number": 18,
    "position": "DF",
    "name": "Max Arfsten"
  },
  {
    "team": "United States",
    "jersey_number": 19,
    "position": "FW",
    "name": "Haji Wright"
  },
  {
    "team": "United States",
    "jersey_number": 20,
    "position": "FW",
    "name": "Folarin Balogun"
  },
  {
    "team": "United States",
    "jersey_number": 21,
    "position": "FW",
    "name": "Timothy Weah"
  },
  {
    "team": "United States",
    "jersey_number": 22,
    "position": "DF",
    "name": "Mark McKenzie"
  },
  {
    "team": "United States",
    "jersey_number": 23,
    "position": "DF",
    "name": "Joe Scally"
  },
  {
    "team": "United States",
    "jersey_number": 24,
    "position": "GK",
    "name": "Matt Freese"
  },
  {
    "team": "United States",
    "jersey_number": 25,
    "position": "GK",
    "name": "Chris Brady"
  },
  {
    "team": "United States",
    "jersey_number": 26,
    "position": "FW",
    "name": "Alejandro Zendejas"
  },
  {
    "team": "Curaçao",
    "jersey_number": 1,
    "position": "GK",
    "name": "Eloy Room"
  },
  {
    "team": "Curaçao",
    "jersey_number": 2,
    "position": "DF",
    "name": "Shurandy Sambo"
  },
  {
    "team": "Curaçao",
    "jersey_number": 3,
    "position": "DF",
    "name": "Jurien Gaari"
  },
  {
    "team": "Curaçao",
    "jersey_number": 4,
    "position": "DF",
    "name": "Roshon van Eijma"
  },
  {
    "team": "Curaçao",
    "jersey_number": 5,
    "position": "DF",
    "name": "Sherel Floranus"
  },
  {
    "team": "Curaçao",
    "jersey_number": 6,
    "position": "MF",
    "name": "Godfried Roemeratoe"
  },
  {
    "team": "Curaçao",
    "jersey_number": 7,
    "position": "MF",
    "name": "Juninho Bacuna"
  },
  {
    "team": "Curaçao",
    "jersey_number": 8,
    "position": "MF",
    "name": "Livano Comenencia"
  },
  {
    "team": "Curaçao",
    "jersey_number": 9,
    "position": "FW",
    "name": "Jurgen Locadia"
  },
  {
    "team": "Curaçao",
    "jersey_number": 10,
    "position": "MF",
    "name": "Leandro Bacuna (C)"
  },
  {
    "team": "Curaçao",
    "jersey_number": 11,
    "position": "FW",
    "name": "Jeremy Antonisse"
  },
  {
    "team": "Curaçao",
    "jersey_number": 12,
    "position": "FW",
    "name": "Sontje Hansen"
  },
  {
    "team": "Curaçao",
    "jersey_number": 13,
    "position": "FW",
    "name": "Tyrese Noslin"
  },
  {
    "team": "Curaçao",
    "jersey_number": 14,
    "position": "FW",
    "name": "Kenji Gorre"
  },
  {
    "team": "Curaçao",
    "jersey_number": 15,
    "position": "MF",
    "name": "Ar'jany Martha"
  },
  {
    "team": "Curaçao",
    "jersey_number": 16,
    "position": "FW",
    "name": "Jearl Margaritha"
  },
  {
    "team": "Curaçao",
    "jersey_number": 17,
    "position": "FW",
    "name": "Brandley Kuwas"
  },
  {
    "team": "Curaçao",
    "jersey_number": 18,
    "position": "DF",
    "name": "Armando Obispo"
  },
  {
    "team": "Curaçao",
    "jersey_number": 19,
    "position": "FW",
    "name": "Gervane Kastaneer"
  },
  {
    "team": "Curaçao",
    "jersey_number": 20,
    "position": "DF",
    "name": "Joshua Brenet"
  },
  {
    "team": "Curaçao",
    "jersey_number": 21,
    "position": "MF",
    "name": "Tahith Chong"
  },
  {
    "team": "Curaçao",
    "jersey_number": 22,
    "position": "MF",
    "name": "Kevin Felida"
  },
  {
    "team": "Curaçao",
    "jersey_number": 23,
    "position": "DF",
    "name": "Riechedly Bazoer"
  },
  {
    "team": "Curaçao",
    "jersey_number": 24,
    "position": "DF",
    "name": "Deveron Fonville"
  },
  {
    "team": "Curaçao",
    "jersey_number": 25,
    "position": "GK",
    "name": "Tyrick Bodak"
  },
  {
    "team": "Curaçao",
    "jersey_number": 26,
    "position": "GK",
    "name": "Trevor Doornbusch"
  },
  {
    "team": "Ecuador",
    "jersey_number": 1,
    "position": "GK",
    "name": "Hernan Galindez"
  },
  {
    "team": "Ecuador",
    "jersey_number": 2,
    "position": "DF",
    "name": "Felix Torres"
  },
  {
    "team": "Ecuador",
    "jersey_number": 3,
    "position": "DF",
    "name": "Piero Hincapie"
  },
  {
    "team": "Ecuador",
    "jersey_number": 4,
    "position": "DF",
    "name": "Joel Ordonez"
  },
  {
    "team": "Ecuador",
    "jersey_number": 5,
    "position": "MF",
    "name": "Jordy Alcivar"
  },
  {
    "team": "Ecuador",
    "jersey_number": 6,
    "position": "DF",
    "name": "Willian Pacho"
  },
  {
    "team": "Ecuador",
    "jersey_number": 7,
    "position": "DF",
    "name": "Pervis Estupinan"
  },
  {
    "team": "Ecuador",
    "jersey_number": 8,
    "position": "MF",
    "name": "Anthony Valencia"
  },
  {
    "team": "Ecuador",
    "jersey_number": 9,
    "position": "FW",
    "name": "John Yeboah"
  },
  {
    "team": "Ecuador",
    "jersey_number": 10,
    "position": "MF",
    "name": "Kendry Paez"
  },
  {
    "team": "Ecuador",
    "jersey_number": 11,
    "position": "FW",
    "name": "Kevin Rodriguez"
  },
  {
    "team": "Ecuador",
    "jersey_number": 12,
    "position": "GK",
    "name": "Moises Ramirez"
  },
  {
    "team": "Ecuador",
    "jersey_number": 13,
    "position": "FW",
    "name": "Enner Valencia (C)"
  },
  {
    "team": "Ecuador",
    "jersey_number": 14,
    "position": "MF",
    "name": "Alan Minda"
  },
  {
    "team": "Ecuador",
    "jersey_number": 15,
    "position": "MF",
    "name": "Pedro Vite"
  },
  {
    "team": "Ecuador",
    "jersey_number": 16,
    "position": "FW",
    "name": "Jordy Caicedo"
  },
  {
    "team": "Ecuador",
    "jersey_number": 17,
    "position": "DF",
    "name": "Angelo Preciado"
  },
  {
    "team": "Ecuador",
    "jersey_number": 18,
    "position": "MF",
    "name": "Denil Castillo"
  },
  {
    "team": "Ecuador",
    "jersey_number": 19,
    "position": "FW",
    "name": "Gonzalo Plata"
  },
  {
    "team": "Ecuador",
    "jersey_number": 20,
    "position": "FW",
    "name": "Nilson Angulo"
  },
  {
    "team": "Ecuador",
    "jersey_number": 21,
    "position": "MF",
    "name": "Alan Franco"
  },
  {
    "team": "Ecuador",
    "jersey_number": 22,
    "position": "GK",
    "name": "Gonzalo Valle"
  },
  {
    "team": "Ecuador",
    "jersey_number": 23,
    "position": "MF",
    "name": "Moises Caicedo"
  },
  {
    "team": "Ecuador",
    "jersey_number": 24,
    "position": "FW",
    "name": "Jeremy Arevalo"
  },
  {
    "team": "Ecuador",
    "jersey_number": 25,
    "position": "DF",
    "name": "Jackson Porozo"
  },
  {
    "team": "Ecuador",
    "jersey_number": 26,
    "position": "DF",
    "name": "Yaimar Medina"
  },
  {
    "team": "Germany",
    "jersey_number": 1,
    "position": "GK",
    "name": "Manuel Neuer"
  },
  {
    "team": "Germany",
    "jersey_number": 2,
    "position": "DF",
    "name": "Antonio Rudiger"
  },
  {
    "team": "Germany",
    "jersey_number": 3,
    "position": "DF",
    "name": "Waldemar Anton"
  },
  {
    "team": "Germany",
    "jersey_number": 4,
    "position": "DF",
    "name": "Jonathan Tah"
  },
  {
    "team": "Germany",
    "jersey_number": 5,
    "position": "MF",
    "name": "Aleksandar Pavlovic"
  },
  {
    "team": "Germany",
    "jersey_number": 6,
    "position": "DF",
    "name": "Joshua Kimmich (C)"
  },
  {
    "team": "Germany",
    "jersey_number": 7,
    "position": "FW",
    "name": "Kai Havertz"
  },
  {
    "team": "Germany",
    "jersey_number": 8,
    "position": "MF",
    "name": "Leon Goretzka"
  },
  {
    "team": "Germany",
    "jersey_number": 9,
    "position": "MF",
    "name": "Jamie Leweling"
  },
  {
    "team": "Germany",
    "jersey_number": 10,
    "position": "MF",
    "name": "Jamal Musiala"
  },
  {
    "team": "Germany",
    "jersey_number": 11,
    "position": "FW",
    "name": "Nick Woltemade"
  },
  {
    "team": "Germany",
    "jersey_number": 12,
    "position": "GK",
    "name": "Oliver Baumann"
  },
  {
    "team": "Germany",
    "jersey_number": 13,
    "position": "MF",
    "name": "Pascal Groß"
  },
  {
    "team": "Germany",
    "jersey_number": 14,
    "position": "FW",
    "name": "Maximilian Beier"
  },
  {
    "team": "Germany",
    "jersey_number": 15,
    "position": "DF",
    "name": "Nico Schlotterbeck"
  },
  {
    "team": "Germany",
    "jersey_number": 16,
    "position": "MF",
    "name": "Angelo Stiller"
  },
  {
    "team": "Germany",
    "jersey_number": 17,
    "position": "MF",
    "name": "Florian Wirtz"
  },
  {
    "team": "Germany",
    "jersey_number": 18,
    "position": "DF",
    "name": "Nathaniel Brown"
  },
  {
    "team": "Germany",
    "jersey_number": 19,
    "position": "MF",
    "name": "Leroy Sane"
  },
  {
    "team": "Germany",
    "jersey_number": 20,
    "position": "MF",
    "name": "Nadiem Amiri"
  },
  {
    "team": "Germany",
    "jersey_number": 21,
    "position": "GK",
    "name": "Alexander Nubel"
  },
  {
    "team": "Germany",
    "jersey_number": 22,
    "position": "DF",
    "name": "David Raum"
  },
  {
    "team": "Germany",
    "jersey_number": 23,
    "position": "MF",
    "name": "Felix Nmecha"
  },
  {
    "team": "Germany",
    "jersey_number": 24,
    "position": "DF",
    "name": "Malick Thiaw"
  },
  {
    "team": "Germany",
    "jersey_number": 25,
    "position": "MF",
    "name": "Assan Ouedraogo"
  },
  {
    "team": "Germany",
    "jersey_number": 26,
    "position": "FW",
    "name": "Deniz Undav"
  },
  {
    "team": "Ivory Coast",
    "jersey_number": 1,
    "position": "GK",
    "name": "Yahia Fofana"
  },
  {
    "team": "Ivory Coast",
    "jersey_number": 2,
    "position": "DF",
    "name": "Ousmane Diomande"
  },
  {
    "team": "Ivory Coast",
    "jersey_number": 3,
    "position": "DF",
    "name": "Ghislain Konan"
  },
  {
    "team": "Ivory Coast",
    "jersey_number": 4,
    "position": "MF",
    "name": "Jean Michael Seri"
  },
  {
    "team": "Ivory Coast",
    "jersey_number": 5,
    "position": "DF",
    "name": "Wilfried Singo"
  },
  {
    "team": "Ivory Coast",
    "jersey_number": 6,
    "position": "MF",
    "name": "Seko Fofana"
  },
  {
    "team": "Ivory Coast",
    "jersey_number": 7,
    "position": "DF",
    "name": "Odilon Kossounou"
  },
  {
    "team": "Ivory Coast",
    "jersey_number": 8,
    "position": "MF",
    "name": "Franck Kessie (C)"
  },
  {
    "team": "Ivory Coast",
    "jersey_number": 9,
    "position": "FW",
    "name": "Ange-Yoan Bonny"
  },
  {
    "team": "Ivory Coast",
    "jersey_number": 10,
    "position": "FW",
    "name": "Simon Adingra"
  },
  {
    "team": "Ivory Coast",
    "jersey_number": 11,
    "position": "FW",
    "name": "Yan Diomande"
  },
  {
    "team": "Ivory Coast",
    "jersey_number": 12,
    "position": "FW",
    "name": "Elye Wahi"
  },
  {
    "team": "Ivory Coast",
    "jersey_number": 13,
    "position": "DF",
    "name": "Christopher Operi"
  },
  {
    "team": "Ivory Coast",
    "jersey_number": 14,
    "position": "FW",
    "name": "Oumar Diakite"
  },
  {
    "team": "Ivory Coast",
    "jersey_number": 15,
    "position": "FW",
    "name": "Amad Diallo"
  },
  {
    "team": "Ivory Coast",
    "jersey_number": 16,
    "position": "GK",
    "name": "Mohamed Kone"
  },
  {
    "team": "Ivory Coast",
    "jersey_number": 17,
    "position": "DF",
    "name": "Guela Doue"
  },
  {
    "team": "Ivory Coast",
    "jersey_number": 18,
    "position": "MF",
    "name": "Ibrahim Sangare"
  },
  {
    "team": "Ivory Coast",
    "jersey_number": 19,
    "position": "FW",
    "name": "Nicolas Pepe"
  },
  {
    "team": "Ivory Coast",
    "jersey_number": 20,
    "position": "DF",
    "name": "Emmanuel Agbadou"
  },
  {
    "team": "Ivory Coast",
    "jersey_number": 21,
    "position": "DF",
    "name": "Evan Ndicka"
  },
  {
    "team": "Ivory Coast",
    "jersey_number": 22,
    "position": "FW",
    "name": "Evann Guessand"
  },
  {
    "team": "Ivory Coast",
    "jersey_number": 23,
    "position": "GK",
    "name": "Alban Lafont"
  },
  {
    "team": "Ivory Coast",
    "jersey_number": 24,
    "position": "FW",
    "name": "Bazoumana Toure"
  },
  {
    "team": "Ivory Coast",
    "jersey_number": 25,
    "position": "MF",
    "name": "Parfait Guiagon"
  },
  {
    "team": "Ivory Coast",
    "jersey_number": 26,
    "position": "MF",
    "name": "Christ Inao Oulai"
  },
  {
    "team": "Japan",
    "jersey_number": 1,
    "position": "GK",
    "name": "Zion Suzuki"
  },
  {
    "team": "Japan",
    "jersey_number": 2,
    "position": "DF",
    "name": "Yukinari Sugawara"
  },
  {
    "team": "Japan",
    "jersey_number": 3,
    "position": "DF",
    "name": "Shogo Taniguchi"
  },
  {
    "team": "Japan",
    "jersey_number": 4,
    "position": "DF",
    "name": "Ko Itakura"
  },
  {
    "team": "Japan",
    "jersey_number": 5,
    "position": "DF",
    "name": "Yuto Nagatomo"
  },
  {
    "team": "Japan",
    "jersey_number": 6,
    "position": "MF",
    "name": "Wataru Endo (C)"
  },
  {
    "team": "Japan",
    "jersey_number": 7,
    "position": "MF",
    "name": "Ao Tanaka"
  },
  {
    "team": "Japan",
    "jersey_number": 8,
    "position": "MF",
    "name": "Takefusa Kubo"
  },
  {
    "team": "Japan",
    "jersey_number": 9,
    "position": "FW",
    "name": "Keisuke Goto"
  },
  {
    "team": "Japan",
    "jersey_number": 10,
    "position": "MF",
    "name": "Ritsu Doan"
  },
  {
    "team": "Japan",
    "jersey_number": 11,
    "position": "MF",
    "name": "Daizen Maeda"
  },
  {
    "team": "Japan",
    "jersey_number": 12,
    "position": "GK",
    "name": "Keisuke Osako"
  },
  {
    "team": "Japan",
    "jersey_number": 13,
    "position": "MF",
    "name": "Keito Nakamura"
  },
  {
    "team": "Japan",
    "jersey_number": 14,
    "position": "MF",
    "name": "Junya Ito"
  },
  {
    "team": "Japan",
    "jersey_number": 15,
    "position": "MF",
    "name": "Daichi Kamada"
  },
  {
    "team": "Japan",
    "jersey_number": 16,
    "position": "DF",
    "name": "Tsuyoshi Watanabe"
  },
  {
    "team": "Japan",
    "jersey_number": 17,
    "position": "MF",
    "name": "Yuito Suzuki"
  },
  {
    "team": "Japan",
    "jersey_number": 18,
    "position": "FW",
    "name": "Ayase Ueda"
  },
  {
    "team": "Japan",
    "jersey_number": 19,
    "position": "FW",
    "name": "Koki Ogawa"
  },
  {
    "team": "Japan",
    "jersey_number": 20,
    "position": "DF",
    "name": "Ayumu Seko"
  },
  {
    "team": "Japan",
    "jersey_number": 21,
    "position": "DF",
    "name": "Hiroki Ito"
  },
  {
    "team": "Japan",
    "jersey_number": 22,
    "position": "DF",
    "name": "Takehiro Tomiyasu"
  },
  {
    "team": "Japan",
    "jersey_number": 23,
    "position": "GK",
    "name": "Tomoki Hayakawa"
  },
  {
    "team": "Japan",
    "jersey_number": 24,
    "position": "MF",
    "name": "Kaishu Sano"
  },
  {
    "team": "Japan",
    "jersey_number": 25,
    "position": "DF",
    "name": "Junnosuke Suzuki"
  },
  {
    "team": "Japan",
    "jersey_number": 26,
    "position": "FW",
    "name": "Kento Shiogai"
  },
  {
    "team": "Netherlands",
    "jersey_number": 1,
    "position": "GK",
    "name": "Bart Verbruggen"
  },
  {
    "team": "Netherlands",
    "jersey_number": 2,
    "position": "DF",
    "name": "Lutsharel Geertruida"
  },
  {
    "team": "Netherlands",
    "jersey_number": 3,
    "position": "MF",
    "name": "Marten de Roon"
  },
  {
    "team": "Netherlands",
    "jersey_number": 4,
    "position": "DF",
    "name": "Virgil van Dijk (C)"
  },
  {
    "team": "Netherlands",
    "jersey_number": 5,
    "position": "DF",
    "name": "Nathan Ake"
  },
  {
    "team": "Netherlands",
    "jersey_number": 6,
    "position": "DF",
    "name": "Jan Paul van Hecke"
  },
  {
    "team": "Netherlands",
    "jersey_number": 7,
    "position": "MF",
    "name": "Justin Kluivert"
  },
  {
    "team": "Netherlands",
    "jersey_number": 8,
    "position": "MF",
    "name": "Ryan Gravenberch"
  },
  {
    "team": "Netherlands",
    "jersey_number": 9,
    "position": "FW",
    "name": "Wout Weghorst"
  },
  {
    "team": "Netherlands",
    "jersey_number": 10,
    "position": "FW",
    "name": "Memphis Depay"
  },
  {
    "team": "Netherlands",
    "jersey_number": 11,
    "position": "FW",
    "name": "Cody Gakpo"
  },
  {
    "team": "Netherlands",
    "jersey_number": 12,
    "position": "DF",
    "name": "Mats Wieffer"
  },
  {
    "team": "Netherlands",
    "jersey_number": 13,
    "position": "GK",
    "name": "Robin Roefs"
  },
  {
    "team": "Netherlands",
    "jersey_number": 14,
    "position": "MF",
    "name": "Tijjani Reijnders"
  },
  {
    "team": "Netherlands",
    "jersey_number": 15,
    "position": "DF",
    "name": "Micky van de Ven"
  },
  {
    "team": "Netherlands",
    "jersey_number": 16,
    "position": "MF",
    "name": "Guus Til"
  },
  {
    "team": "Netherlands",
    "jersey_number": 17,
    "position": "FW",
    "name": "Noa Lang"
  },
  {
    "team": "Netherlands",
    "jersey_number": 18,
    "position": "FW",
    "name": "Donyell Malen"
  },
  {
    "team": "Netherlands",
    "jersey_number": 19,
    "position": "FW",
    "name": "Brian Brobbey"
  },
  {
    "team": "Netherlands",
    "jersey_number": 20,
    "position": "MF",
    "name": "Teun Koopmeiners"
  },
  {
    "team": "Netherlands",
    "jersey_number": 21,
    "position": "MF",
    "name": "Frenkie de Jong"
  },
  {
    "team": "Netherlands",
    "jersey_number": 22,
    "position": "DF",
    "name": "Denzel Dumfries"
  },
  {
    "team": "Netherlands",
    "jersey_number": 23,
    "position": "GK",
    "name": "Mark Flekken"
  },
  {
    "team": "Netherlands",
    "jersey_number": 24,
    "position": "FW",
    "name": "Crysencio Summerville"
  },
  {
    "team": "Netherlands",
    "jersey_number": 25,
    "position": "DF",
    "name": "Jorrel Hato"
  },
  {
    "team": "Netherlands",
    "jersey_number": 26,
    "position": "MF",
    "name": "Quinten Timber"
  },
  {
    "team": "Sweden",
    "jersey_number": 1,
    "position": "GK",
    "name": "Jacob Widell Zetterstrom"
  },
  {
    "team": "Sweden",
    "jersey_number": 2,
    "position": "DF",
    "name": "Gustaf Lagerbielke"
  },
  {
    "team": "Sweden",
    "jersey_number": 3,
    "position": "DF",
    "name": "Victor Lindelof (C)"
  },
  {
    "team": "Sweden",
    "jersey_number": 4,
    "position": "DF",
    "name": "Isak Hien"
  },
  {
    "team": "Sweden",
    "jersey_number": 5,
    "position": "DF",
    "name": "Gabriel Gudmundsson"
  },
  {
    "team": "Sweden",
    "jersey_number": 6,
    "position": "DF",
    "name": "Herman Johansson"
  },
  {
    "team": "Sweden",
    "jersey_number": 7,
    "position": "MF",
    "name": "Lucas Bergvall"
  },
  {
    "team": "Sweden",
    "jersey_number": 8,
    "position": "DF",
    "name": "Daniel Svensson"
  },
  {
    "team": "Sweden",
    "jersey_number": 9,
    "position": "FW",
    "name": "Alexander Isak"
  },
  {
    "team": "Sweden",
    "jersey_number": 10,
    "position": "MF",
    "name": "Benjamin Nygren"
  },
  {
    "team": "Sweden",
    "jersey_number": 11,
    "position": "FW",
    "name": "Anthony Elanga"
  },
  {
    "team": "Sweden",
    "jersey_number": 12,
    "position": "GK",
    "name": "Viktor Johansson"
  },
  {
    "team": "Sweden",
    "jersey_number": 13,
    "position": "MF",
    "name": "Ken Sema"
  },
  {
    "team": "Sweden",
    "jersey_number": 14,
    "position": "DF",
    "name": "Hjalmar Ekdal"
  },
  {
    "team": "Sweden",
    "jersey_number": 15,
    "position": "DF",
    "name": "Carl Starfelt"
  },
  {
    "team": "Sweden",
    "jersey_number": 16,
    "position": "MF",
    "name": "Jesper Karlstrom"
  },
  {
    "team": "Sweden",
    "jersey_number": 17,
    "position": "FW",
    "name": "Viktor Gyokeres"
  },
  {
    "team": "Sweden",
    "jersey_number": 18,
    "position": "MF",
    "name": "Yasin Ayari"
  },
  {
    "team": "Sweden",
    "jersey_number": 19,
    "position": "MF",
    "name": "Mattias Svanberg"
  },
  {
    "team": "Sweden",
    "jersey_number": 20,
    "position": "DF",
    "name": "Eric Smith"
  },
  {
    "team": "Sweden",
    "jersey_number": 21,
    "position": "DF",
    "name": "Alexander Bernhardsson"
  },
  {
    "team": "Sweden",
    "jersey_number": 22,
    "position": "MF",
    "name": "Besfort Zeneli"
  },
  {
    "team": "Sweden",
    "jersey_number": 23,
    "position": "GK",
    "name": "Kristoffer Nordfeldt"
  },
  {
    "team": "Sweden",
    "jersey_number": 24,
    "position": "DF",
    "name": "Elliot Stroud"
  },
  {
    "team": "Sweden",
    "jersey_number": 25,
    "position": "FW",
    "name": "Gustaf Nilsson"
  },
  {
    "team": "Sweden",
    "jersey_number": 26,
    "position": "FW",
    "name": "Taha Ali"
  },
  {
    "team": "Tunisia",
    "jersey_number": 1,
    "position": "GK",
    "name": "Mouhib Chamakh"
  },
  {
    "team": "Tunisia",
    "jersey_number": 2,
    "position": "DF",
    "name": "Ali Abdi"
  },
  {
    "team": "Tunisia",
    "jersey_number": 3,
    "position": "DF",
    "name": "Montassar Talbi"
  },
  {
    "team": "Tunisia",
    "jersey_number": 4,
    "position": "DF",
    "name": "Omar Rekik"
  },
  {
    "team": "Tunisia",
    "jersey_number": 5,
    "position": "DF",
    "name": "Adem Arous"
  },
  {
    "team": "Tunisia",
    "jersey_number": 6,
    "position": "DF",
    "name": "Dylan Bronn"
  },
  {
    "team": "Tunisia",
    "jersey_number": 7,
    "position": "FW",
    "name": "Elias Achouri"
  },
  {
    "team": "Tunisia",
    "jersey_number": 8,
    "position": "FW",
    "name": "Elias Saad"
  },
  {
    "team": "Tunisia",
    "jersey_number": 9,
    "position": "FW",
    "name": "Hazem Mastouri"
  },
  {
    "team": "Tunisia",
    "jersey_number": 10,
    "position": "MF",
    "name": "Hannibal Mejbri"
  },
  {
    "team": "Tunisia",
    "jersey_number": 11,
    "position": "MF",
    "name": "Ismael Gharbi"
  },
  {
    "team": "Tunisia",
    "jersey_number": 12,
    "position": "DF",
    "name": "Mortadha Ben Ouanes"
  },
  {
    "team": "Tunisia",
    "jersey_number": 13,
    "position": "MF",
    "name": "Rani Khedira"
  },
  {
    "team": "Tunisia",
    "jersey_number": 14,
    "position": "MF",
    "name": "Khalil Ayari"
  },
  {
    "team": "Tunisia",
    "jersey_number": 15,
    "position": "MF",
    "name": "Hadj Mahmoud"
  },
  {
    "team": "Tunisia",
    "jersey_number": 16,
    "position": "GK",
    "name": "Aymen Dahmen"
  },
  {
    "team": "Tunisia",
    "jersey_number": 17,
    "position": "MF",
    "name": "Ellyes Skhiri (C)"
  },
  {
    "team": "Tunisia",
    "jersey_number": 18,
    "position": "FW",
    "name": "Rayan Elloumi"
  },
  {
    "team": "Tunisia",
    "jersey_number": 19,
    "position": "FW",
    "name": "Firas Chaouat"
  },
  {
    "team": "Tunisia",
    "jersey_number": 20,
    "position": "DF",
    "name": "Yan Valery"
  },
  {
    "team": "Tunisia",
    "jersey_number": 21,
    "position": "DF",
    "name": "Mohamed Amine Ben Hamida"
  },
  {
    "team": "Tunisia",
    "jersey_number": 22,
    "position": "GK",
    "name": "Sabri Ben Hessen"
  },
  {
    "team": "Tunisia",
    "jersey_number": 23,
    "position": "DF",
    "name": "Moutaz Neffati"
  },
  {
    "team": "Tunisia",
    "jersey_number": 24,
    "position": "DF",
    "name": "Raed Chikhaoui"
  },
  {
    "team": "Tunisia",
    "jersey_number": 25,
    "position": "MF",
    "name": "Anis Ben Slimane"
  },
  {
    "team": "Tunisia",
    "jersey_number": 26,
    "position": "MF",
    "name": "Sebastian Tounekti"
  },
  {
    "team": "Belgium",
    "jersey_number": 1,
    "position": "GK",
    "name": "Thibaut Courtois"
  },
  {
    "team": "Belgium",
    "jersey_number": 2,
    "position": "DF",
    "name": "Zeno Debast"
  },
  {
    "team": "Belgium",
    "jersey_number": 3,
    "position": "DF",
    "name": "Arthur Theate"
  },
  {
    "team": "Belgium",
    "jersey_number": 4,
    "position": "DF",
    "name": "Brandon Mechele"
  },
  {
    "team": "Belgium",
    "jersey_number": 5,
    "position": "DF",
    "name": "Maxim De Cuyper"
  },
  {
    "team": "Belgium",
    "jersey_number": 6,
    "position": "MF",
    "name": "Axel Witsel"
  },
  {
    "team": "Belgium",
    "jersey_number": 7,
    "position": "MF",
    "name": "Kevin De Bruyne"
  },
  {
    "team": "Belgium",
    "jersey_number": 8,
    "position": "MF",
    "name": "Youri Tielemans (C)"
  },
  {
    "team": "Belgium",
    "jersey_number": 9,
    "position": "FW",
    "name": "Romelu Lukaku"
  },
  {
    "team": "Belgium",
    "jersey_number": 10,
    "position": "FW",
    "name": "Leandro Trossard"
  },
  {
    "team": "Belgium",
    "jersey_number": 11,
    "position": "FW",
    "name": "Jeremy Doku"
  },
  {
    "team": "Belgium",
    "jersey_number": 12,
    "position": "GK",
    "name": "Senne Lammens"
  },
  {
    "team": "Belgium",
    "jersey_number": 13,
    "position": "GK",
    "name": "Mike Penders"
  },
  {
    "team": "Belgium",
    "jersey_number": 14,
    "position": "FW",
    "name": "Dodi Lukebakio"
  },
  {
    "team": "Belgium",
    "jersey_number": 15,
    "position": "DF",
    "name": "Thomas Meunier"
  },
  {
    "team": "Belgium",
    "jersey_number": 16,
    "position": "DF",
    "name": "Koni De Winter"
  },
  {
    "team": "Belgium",
    "jersey_number": 17,
    "position": "FW",
    "name": "Charles De Ketelaere"
  },
  {
    "team": "Belgium",
    "jersey_number": 18,
    "position": "DF",
    "name": "Joaquin Seys"
  },
  {
    "team": "Belgium",
    "jersey_number": 19,
    "position": "MF",
    "name": "Diego Moreira"
  },
  {
    "team": "Belgium",
    "jersey_number": 20,
    "position": "MF",
    "name": "Hans Vanaken"
  },
  {
    "team": "Belgium",
    "jersey_number": 21,
    "position": "DF",
    "name": "Timothy Castagne"
  },
  {
    "team": "Belgium",
    "jersey_number": 22,
    "position": "MF",
    "name": "Alexis Saelemaekers"
  },
  {
    "team": "Belgium",
    "jersey_number": 23,
    "position": "MF",
    "name": "Nicolas Raskin"
  },
  {
    "team": "Belgium",
    "jersey_number": 24,
    "position": "MF",
    "name": "Amadou Onana"
  },
  {
    "team": "Belgium",
    "jersey_number": 25,
    "position": "DF",
    "name": "Nathan Ngoy"
  },
  {
    "team": "Belgium",
    "jersey_number": 26,
    "position": "FW",
    "name": "Matias Fernandez-Pardo"
  },
  {
    "team": "Egypt",
    "jersey_number": 1,
    "position": "GK",
    "name": "Mohamed El Shenawy"
  },
  {
    "team": "Egypt",
    "jersey_number": 2,
    "position": "DF",
    "name": "Yasser Ibrahim"
  },
  {
    "team": "Egypt",
    "jersey_number": 3,
    "position": "DF",
    "name": "Mohamed Hany"
  },
  {
    "team": "Egypt",
    "jersey_number": 4,
    "position": "DF",
    "name": "Hossam Abdelmaguid"
  },
  {
    "team": "Egypt",
    "jersey_number": 5,
    "position": "DF",
    "name": "Ramy Rabia"
  },
  {
    "team": "Egypt",
    "jersey_number": 6,
    "position": "DF",
    "name": "Mohamed Abdelmonem"
  },
  {
    "team": "Egypt",
    "jersey_number": 7,
    "position": "FW",
    "name": "Trezeguet"
  },
  {
    "team": "Egypt",
    "jersey_number": 8,
    "position": "MF",
    "name": "Emam Ashour"
  },
  {
    "team": "Egypt",
    "jersey_number": 9,
    "position": "FW",
    "name": "Hamza Abdelkarim"
  },
  {
    "team": "Egypt",
    "jersey_number": 10,
    "position": "FW",
    "name": "Mohamed Salah (C)"
  },
  {
    "team": "Egypt",
    "jersey_number": 11,
    "position": "MF",
    "name": "Mostafa Ziko"
  },
  {
    "team": "Egypt",
    "jersey_number": 12,
    "position": "FW",
    "name": "Haissem Hassan"
  },
  {
    "team": "Egypt",
    "jersey_number": 13,
    "position": "DF",
    "name": "Ahmed Fatouh"
  },
  {
    "team": "Egypt",
    "jersey_number": 14,
    "position": "MF",
    "name": "Hamdy Fathy"
  },
  {
    "team": "Egypt",
    "jersey_number": 15,
    "position": "DF",
    "name": "Karim Hafez"
  },
  {
    "team": "Egypt",
    "jersey_number": 16,
    "position": "GK",
    "name": "El Mahdy Soliman"
  },
  {
    "team": "Egypt",
    "jersey_number": 17,
    "position": "MF",
    "name": "Mohanad Lasheen"
  },
  {
    "team": "Egypt",
    "jersey_number": 18,
    "position": "MF",
    "name": "Nabil Emad"
  },
  {
    "team": "Egypt",
    "jersey_number": 19,
    "position": "MF",
    "name": "Marwan Attia"
  },
  {
    "team": "Egypt",
    "jersey_number": 20,
    "position": "FW",
    "name": "Ibrahim Adel"
  },
  {
    "team": "Egypt",
    "jersey_number": 21,
    "position": "MF",
    "name": "Mahmoud Saber"
  },
  {
    "team": "Egypt",
    "jersey_number": 22,
    "position": "FW",
    "name": "Omar Marmoush"
  },
  {
    "team": "Egypt",
    "jersey_number": 23,
    "position": "GK",
    "name": "Mostafa Shobeir"
  },
  {
    "team": "Egypt",
    "jersey_number": 24,
    "position": "DF",
    "name": "Tarek Alaa"
  },
  {
    "team": "Egypt",
    "jersey_number": 25,
    "position": "FW",
    "name": "Zizo"
  },
  {
    "team": "Egypt",
    "jersey_number": 26,
    "position": "GK",
    "name": "Mohamed Alaa"
  },
  {
    "team": "Iran",
    "jersey_number": 1,
    "position": "GK",
    "name": "Alireza Beiranvand"
  },
  {
    "team": "Iran",
    "jersey_number": 2,
    "position": "DF",
    "name": "Saleh Hardani"
  },
  {
    "team": "Iran",
    "jersey_number": 3,
    "position": "DF",
    "name": "Ehsan Hajsafi (C)"
  },
  {
    "team": "Iran",
    "jersey_number": 4,
    "position": "DF",
    "name": "Shojae Khalilzadeh"
  },
  {
    "team": "Iran",
    "jersey_number": 5,
    "position": "DF",
    "name": "Milad Mohammadi"
  },
  {
    "team": "Iran",
    "jersey_number": 6,
    "position": "MF",
    "name": "Saeid Ezatolahi"
  },
  {
    "team": "Iran",
    "jersey_number": 7,
    "position": "MF",
    "name": "Alireza Jahanbakhsh"
  },
  {
    "team": "Iran",
    "jersey_number": 8,
    "position": "MF",
    "name": "Mohammad Mohebi"
  },
  {
    "team": "Iran",
    "jersey_number": 9,
    "position": "FW",
    "name": "Mehdi Taremi"
  },
  {
    "team": "Iran",
    "jersey_number": 10,
    "position": "FW",
    "name": "Mehdi Ghayedi"
  },
  {
    "team": "Iran",
    "jersey_number": 11,
    "position": "FW",
    "name": "Ali Alipour"
  },
  {
    "team": "Iran",
    "jersey_number": 12,
    "position": "GK",
    "name": "Payam Niazmand"
  },
  {
    "team": "Iran",
    "jersey_number": 13,
    "position": "DF",
    "name": "Hossein Kanaanizadegan"
  },
  {
    "team": "Iran",
    "jersey_number": 14,
    "position": "MF",
    "name": "Saman Ghoddos"
  },
  {
    "team": "Iran",
    "jersey_number": 15,
    "position": "MF",
    "name": "Rouzbeh Cheshmi"
  },
  {
    "team": "Iran",
    "jersey_number": 16,
    "position": "MF",
    "name": "Mehdi Torabi"
  },
  {
    "team": "Iran",
    "jersey_number": 17,
    "position": "DF",
    "name": "Aria Yousefi"
  },
  {
    "team": "Iran",
    "jersey_number": 18,
    "position": "FW",
    "name": "Amirhossein Hosseinzadeh"
  },
  {
    "team": "Iran",
    "jersey_number": 19,
    "position": "DF",
    "name": "Ali Nemati"
  },
  {
    "team": "Iran",
    "jersey_number": 20,
    "position": "FW",
    "name": "Shahriyar Moghanlou"
  },
  {
    "team": "Iran",
    "jersey_number": 21,
    "position": "MF",
    "name": "Mohammad Ghorbani"
  },
  {
    "team": "Iran",
    "jersey_number": 22,
    "position": "GK",
    "name": "Hossein Hosseini"
  },
  {
    "team": "Iran",
    "jersey_number": 23,
    "position": "DF",
    "name": "Ramin Rezaeian"
  },
  {
    "team": "Iran",
    "jersey_number": 24,
    "position": "FW",
    "name": "Dennis Eckert"
  },
  {
    "team": "Iran",
    "jersey_number": 25,
    "position": "DF",
    "name": "Danial Eiri"
  },
  {
    "team": "Iran",
    "jersey_number": 26,
    "position": "MF",
    "name": "Amirmohammad Razzaghinia"
  },
  {
    "team": "New Zealand",
    "jersey_number": 1,
    "position": "GK",
    "name": "Max Crocombe"
  },
  {
    "team": "New Zealand",
    "jersey_number": 2,
    "position": "DF",
    "name": "Tim Payne"
  },
  {
    "team": "New Zealand",
    "jersey_number": 3,
    "position": "DF",
    "name": "Francis de Vries"
  },
  {
    "team": "New Zealand",
    "jersey_number": 4,
    "position": "DF",
    "name": "Tyler Bindon"
  },
  {
    "team": "New Zealand",
    "jersey_number": 5,
    "position": "DF",
    "name": "Michael Boxall"
  },
  {
    "team": "New Zealand",
    "jersey_number": 6,
    "position": "MF",
    "name": "Joe Bell"
  },
  {
    "team": "New Zealand",
    "jersey_number": 7,
    "position": "MF",
    "name": "Matthew Garbett"
  },
  {
    "team": "New Zealand",
    "jersey_number": 8,
    "position": "MF",
    "name": "Marko Stamenic"
  },
  {
    "team": "New Zealand",
    "jersey_number": 9,
    "position": "FW",
    "name": "Chris Wood (C)"
  },
  {
    "team": "New Zealand",
    "jersey_number": 10,
    "position": "MF",
    "name": "Sarpreet Singh"
  },
  {
    "team": "New Zealand",
    "jersey_number": 11,
    "position": "MF",
    "name": "Elijah Just"
  },
  {
    "team": "New Zealand",
    "jersey_number": 12,
    "position": "GK",
    "name": "Alex Paulsen"
  },
  {
    "team": "New Zealand",
    "jersey_number": 13,
    "position": "DF",
    "name": "Liberato Cacace"
  },
  {
    "team": "New Zealand",
    "jersey_number": 14,
    "position": "MF",
    "name": "Alex Rufer"
  },
  {
    "team": "New Zealand",
    "jersey_number": 15,
    "position": "DF",
    "name": "Nando Pijnaker"
  },
  {
    "team": "New Zealand",
    "jersey_number": 16,
    "position": "DF",
    "name": "Finn Surman"
  },
  {
    "team": "New Zealand",
    "jersey_number": 17,
    "position": "FW",
    "name": "Kosta Barbarouses"
  },
  {
    "team": "New Zealand",
    "jersey_number": 18,
    "position": "FW",
    "name": "Ben Waine"
  },
  {
    "team": "New Zealand",
    "jersey_number": 19,
    "position": "MF",
    "name": "Ben Old"
  },
  {
    "team": "New Zealand",
    "jersey_number": 20,
    "position": "MF",
    "name": "Callum McCowatt"
  },
  {
    "team": "New Zealand",
    "jersey_number": 21,
    "position": "FW",
    "name": "Jesse Randall"
  },
  {
    "team": "New Zealand",
    "jersey_number": 22,
    "position": "GK",
    "name": "Michael Woud"
  },
  {
    "team": "New Zealand",
    "jersey_number": 23,
    "position": "MF",
    "name": "Ryan Thomas"
  },
  {
    "team": "New Zealand",
    "jersey_number": 24,
    "position": "DF",
    "name": "Callan Elliot"
  },
  {
    "team": "New Zealand",
    "jersey_number": 25,
    "position": "MF",
    "name": "Lachlan Bayliss"
  },
  {
    "team": "New Zealand",
    "jersey_number": 26,
    "position": "DF",
    "name": "Tommy Smith"
  },
  {
    "team": "Cabo Verde",
    "jersey_number": 1,
    "position": "GK",
    "name": "Vozinha"
  },
  {
    "team": "Cabo Verde",
    "jersey_number": 2,
    "position": "DF",
    "name": "Stopira"
  },
  {
    "team": "Cabo Verde",
    "jersey_number": 3,
    "position": "DF",
    "name": "Diney"
  },
  {
    "team": "Cabo Verde",
    "jersey_number": 4,
    "position": "DF",
    "name": "Roberto Lopes"
  },
  {
    "team": "Cabo Verde",
    "jersey_number": 5,
    "position": "DF",
    "name": "Logan Costa"
  },
  {
    "team": "Cabo Verde",
    "jersey_number": 6,
    "position": "MF",
    "name": "Kevin Pina"
  },
  {
    "team": "Cabo Verde",
    "jersey_number": 7,
    "position": "MF",
    "name": "Jovane Cabral"
  },
  {
    "team": "Cabo Verde",
    "jersey_number": 8,
    "position": "MF",
    "name": "Joao Paulo"
  },
  {
    "team": "Cabo Verde",
    "jersey_number": 9,
    "position": "FW",
    "name": "Gilson Benchimol"
  },
  {
    "team": "Cabo Verde",
    "jersey_number": 10,
    "position": "MF",
    "name": "Jamiro Monteiro"
  },
  {
    "team": "Cabo Verde",
    "jersey_number": 11,
    "position": "MF",
    "name": "Garry Rodrigues"
  },
  {
    "team": "Cabo Verde",
    "jersey_number": 12,
    "position": "GK",
    "name": "Marcio Rosa"
  },
  {
    "team": "Cabo Verde",
    "jersey_number": 13,
    "position": "DF",
    "name": "Sidny Lopes Cabral"
  },
  {
    "team": "Cabo Verde",
    "jersey_number": 14,
    "position": "MF",
    "name": "Deroy Duarte"
  },
  {
    "team": "Cabo Verde",
    "jersey_number": 15,
    "position": "MF",
    "name": "Laros Duarte"
  },
  {
    "team": "Cabo Verde",
    "jersey_number": 16,
    "position": "MF",
    "name": "Yannick Semedo"
  },
  {
    "team": "Cabo Verde",
    "jersey_number": 17,
    "position": "MF",
    "name": "Willy Semedo"
  },
  {
    "team": "Cabo Verde",
    "jersey_number": 18,
    "position": "MF",
    "name": "Telmo Arcanjo"
  },
  {
    "team": "Cabo Verde",
    "jersey_number": 19,
    "position": "FW",
    "name": "Dailon Livramento"
  },
  {
    "team": "Cabo Verde",
    "jersey_number": 20,
    "position": "FW",
    "name": "Ryan Mendes (C)"
  },
  {
    "team": "Cabo Verde",
    "jersey_number": 21,
    "position": "MF",
    "name": "Nuno da Costa"
  },
  {
    "team": "Cabo Verde",
    "jersey_number": 22,
    "position": "DF",
    "name": "Steven Moreira"
  },
  {
    "team": "Cabo Verde",
    "jersey_number": 23,
    "position": "GK",
    "name": "CJ dos Santos"
  },
  {
    "team": "Cabo Verde",
    "jersey_number": 24,
    "position": "DF",
    "name": "Wagner Pina"
  },
  {
    "team": "Cabo Verde",
    "jersey_number": 25,
    "position": "DF",
    "name": "Kelvin Pires"
  },
  {
    "team": "Cabo Verde",
    "jersey_number": 26,
    "position": "MF",
    "name": "Helio Varela"
  },
  {
    "team": "Saudi Arabia",
    "jersey_number": 1,
    "position": "GK",
    "name": "Nawaf Al-Aqidi"
  },
  {
    "team": "Saudi Arabia",
    "jersey_number": 2,
    "position": "DF",
    "name": "Ali Majrashi"
  },
  {
    "team": "Saudi Arabia",
    "jersey_number": 3,
    "position": "DF",
    "name": "Ali Lajami"
  },
  {
    "team": "Saudi Arabia",
    "jersey_number": 4,
    "position": "DF",
    "name": "Abdulelah Al-Amri"
  },
  {
    "team": "Saudi Arabia",
    "jersey_number": 5,
    "position": "DF",
    "name": "Hassan Al-Tambakti"
  },
  {
    "team": "Saudi Arabia",
    "jersey_number": 6,
    "position": "MF",
    "name": "Nasser Al-Dawsari"
  },
  {
    "team": "Saudi Arabia",
    "jersey_number": 7,
    "position": "MF",
    "name": "Musab Al-Juwayr"
  },
  {
    "team": "Saudi Arabia",
    "jersey_number": 8,
    "position": "FW",
    "name": "Ayman Yahya"
  },
  {
    "team": "Saudi Arabia",
    "jersey_number": 9,
    "position": "FW",
    "name": "Firas Al-Buraikan"
  },
  {
    "team": "Saudi Arabia",
    "jersey_number": 10,
    "position": "FW",
    "name": "Salem Al-Dawsari (C)"
  },
  {
    "team": "Saudi Arabia",
    "jersey_number": 11,
    "position": "FW",
    "name": "Saleh Al-Shehri"
  },
  {
    "team": "Saudi Arabia",
    "jersey_number": 12,
    "position": "DF",
    "name": "Saud Abdulhamid"
  },
  {
    "team": "Saudi Arabia",
    "jersey_number": 13,
    "position": "DF",
    "name": "Nawaf Boushal"
  },
  {
    "team": "Saudi Arabia",
    "jersey_number": 14,
    "position": "DF",
    "name": "Hassan Kadesh"
  },
  {
    "team": "Saudi Arabia",
    "jersey_number": 15,
    "position": "MF",
    "name": "Abdullah Al-Khaibari"
  },
  {
    "team": "Saudi Arabia",
    "jersey_number": 16,
    "position": "MF",
    "name": "Ziyad Al-Johani"
  },
  {
    "team": "Saudi Arabia",
    "jersey_number": 17,
    "position": "FW",
    "name": "Khalid Al-Ghannam"
  },
  {
    "team": "Saudi Arabia",
    "jersey_number": 18,
    "position": "MF",
    "name": "Alaa Al-Hejji"
  },
  {
    "team": "Saudi Arabia",
    "jersey_number": 19,
    "position": "FW",
    "name": "Abdullah Al-Hamdan"
  },
  {
    "team": "Saudi Arabia",
    "jersey_number": 20,
    "position": "FW",
    "name": "Sultan Mandash"
  },
  {
    "team": "Saudi Arabia",
    "jersey_number": 21,
    "position": "GK",
    "name": "Mohammed Al-Owais"
  },
  {
    "team": "Saudi Arabia",
    "jersey_number": 22,
    "position": "GK",
    "name": "Ahmed Al-Kassar"
  },
  {
    "team": "Saudi Arabia",
    "jersey_number": 23,
    "position": "MF",
    "name": "Mohamed Kanno"
  },
  {
    "team": "Saudi Arabia",
    "jersey_number": 24,
    "position": "DF",
    "name": "Moteb Al-Harbi"
  },
  {
    "team": "Saudi Arabia",
    "jersey_number": 25,
    "position": "DF",
    "name": "Jehad Thakri"
  },
  {
    "team": "Saudi Arabia",
    "jersey_number": 26,
    "position": "DF",
    "name": "Mohammed Abu Al-Shamat"
  },
  {
    "team": "Spain",
    "jersey_number": 1,
    "position": "GK",
    "name": "David Raya"
  },
  {
    "team": "Spain",
    "jersey_number": 2,
    "position": "DF",
    "name": "Marc Pubill"
  },
  {
    "team": "Spain",
    "jersey_number": 3,
    "position": "DF",
    "name": "Alex Grimaldo"
  },
  {
    "team": "Spain",
    "jersey_number": 4,
    "position": "DF",
    "name": "Eric Garcia"
  },
  {
    "team": "Spain",
    "jersey_number": 5,
    "position": "DF",
    "name": "Marcos Llorente"
  },
  {
    "team": "Spain",
    "jersey_number": 6,
    "position": "MF",
    "name": "Mikel Merino"
  },
  {
    "team": "Spain",
    "jersey_number": 7,
    "position": "FW",
    "name": "Ferran Torres"
  },
  {
    "team": "Spain",
    "jersey_number": 8,
    "position": "MF",
    "name": "Fabian Ruiz"
  },
  {
    "team": "Spain",
    "jersey_number": 9,
    "position": "MF",
    "name": "Gavi"
  },
  {
    "team": "Spain",
    "jersey_number": 10,
    "position": "FW",
    "name": "Dani Olmo"
  },
  {
    "team": "Spain",
    "jersey_number": 11,
    "position": "FW",
    "name": "Yeremy Pino"
  },
  {
    "team": "Spain",
    "jersey_number": 12,
    "position": "DF",
    "name": "Pedro Porro"
  },
  {
    "team": "Spain",
    "jersey_number": 13,
    "position": "GK",
    "name": "Joan Garcia"
  },
  {
    "team": "Spain",
    "jersey_number": 14,
    "position": "DF",
    "name": "Aymeric Laporte"
  },
  {
    "team": "Spain",
    "jersey_number": 15,
    "position": "MF",
    "name": "Alex Baena"
  },
  {
    "team": "Spain",
    "jersey_number": 16,
    "position": "MF",
    "name": "Rodri (C)"
  },
  {
    "team": "Spain",
    "jersey_number": 17,
    "position": "FW",
    "name": "Nico Williams"
  },
  {
    "team": "Spain",
    "jersey_number": 18,
    "position": "MF",
    "name": "Martin Zubimendi"
  },
  {
    "team": "Spain",
    "jersey_number": 19,
    "position": "FW",
    "name": "Lamine Yamal"
  },
  {
    "team": "Spain",
    "jersey_number": 20,
    "position": "MF",
    "name": "Pedri"
  },
  {
    "team": "Spain",
    "jersey_number": 21,
    "position": "FW",
    "name": "Mikel Oyarzabal"
  },
  {
    "team": "Spain",
    "jersey_number": 22,
    "position": "DF",
    "name": "Pau Cubarsi"
  },
  {
    "team": "Spain",
    "jersey_number": 23,
    "position": "GK",
    "name": "Unai Simon"
  },
  {
    "team": "Spain",
    "jersey_number": 24,
    "position": "DF",
    "name": "Marc Cucurella"
  },
  {
    "team": "Spain",
    "jersey_number": 25,
    "position": "FW",
    "name": "Victor Munoz"
  },
  {
    "team": "Spain",
    "jersey_number": 26,
    "position": "FW",
    "name": "Borja Iglesias"
  },
  {
    "team": "Uruguay",
    "jersey_number": 1,
    "position": "GK",
    "name": "Sergio Rochet"
  },
  {
    "team": "Uruguay",
    "jersey_number": 2,
    "position": "DF",
    "name": "Jose Gimenez (C)"
  },
  {
    "team": "Uruguay",
    "jersey_number": 3,
    "position": "DF",
    "name": "Sebastian Caceres"
  },
  {
    "team": "Uruguay",
    "jersey_number": 4,
    "position": "DF",
    "name": "Ronald Araujo"
  },
  {
    "team": "Uruguay",
    "jersey_number": 5,
    "position": "MF",
    "name": "Manuel Ugarte"
  },
  {
    "team": "Uruguay",
    "jersey_number": 6,
    "position": "MF",
    "name": "Rodrigo Bentancur"
  },
  {
    "team": "Uruguay",
    "jersey_number": 7,
    "position": "MF",
    "name": "Nicolas de la Cruz"
  },
  {
    "team": "Uruguay",
    "jersey_number": 8,
    "position": "MF",
    "name": "Federico Valverde"
  },
  {
    "team": "Uruguay",
    "jersey_number": 9,
    "position": "FW",
    "name": "Darwin Nunez"
  },
  {
    "team": "Uruguay",
    "jersey_number": 10,
    "position": "MF",
    "name": "Giorgian de Arrascaeta"
  },
  {
    "team": "Uruguay",
    "jersey_number": 11,
    "position": "FW",
    "name": "Facundo Pellistri"
  },
  {
    "team": "Uruguay",
    "jersey_number": 12,
    "position": "GK",
    "name": "Santiago Mele"
  },
  {
    "team": "Uruguay",
    "jersey_number": 13,
    "position": "DF",
    "name": "Guillermo Varela"
  },
  {
    "team": "Uruguay",
    "jersey_number": 14,
    "position": "MF",
    "name": "Agustin Canobbio"
  },
  {
    "team": "Uruguay",
    "jersey_number": 15,
    "position": "MF",
    "name": "Emiliano Martinez"
  },
  {
    "team": "Uruguay",
    "jersey_number": 16,
    "position": "DF",
    "name": "Mathias Olivera"
  },
  {
    "team": "Uruguay",
    "jersey_number": 17,
    "position": "DF",
    "name": "Matias Vina"
  },
  {
    "team": "Uruguay",
    "jersey_number": 18,
    "position": "FW",
    "name": "Brian Rodriguez"
  },
  {
    "team": "Uruguay",
    "jersey_number": 19,
    "position": "FW",
    "name": "Rodrigo Aguirre"
  },
  {
    "team": "Uruguay",
    "jersey_number": 20,
    "position": "MF",
    "name": "Maximiliano Araujo"
  },
  {
    "team": "Uruguay",
    "jersey_number": 21,
    "position": "FW",
    "name": "Federico Vinas"
  },
  {
    "team": "Uruguay",
    "jersey_number": 22,
    "position": "MF",
    "name": "Joaquin Piquerez"
  },
  {
    "team": "Uruguay",
    "jersey_number": 23,
    "position": "GK",
    "name": "Fernando Muslera"
  },
  {
    "team": "Uruguay",
    "jersey_number": 24,
    "position": "DF",
    "name": "Santiago Bueno"
  },
  {
    "team": "Uruguay",
    "jersey_number": 25,
    "position": "MF",
    "name": "Juan Manuel Sanabria"
  },
  {
    "team": "Uruguay",
    "jersey_number": 26,
    "position": "MF",
    "name": "Rodrigo Zalazar"
  },
  {
    "team": "France",
    "jersey_number": 1,
    "position": "GK",
    "name": "Brice Samba"
  },
  {
    "team": "France",
    "jersey_number": 2,
    "position": "DF",
    "name": "Malo Gusto"
  },
  {
    "team": "France",
    "jersey_number": 3,
    "position": "DF",
    "name": "Lucas Digne"
  },
  {
    "team": "France",
    "jersey_number": 4,
    "position": "DF",
    "name": "Dayot Upamecano"
  },
  {
    "team": "France",
    "jersey_number": 5,
    "position": "DF",
    "name": "Jules Kounde"
  },
  {
    "team": "France",
    "jersey_number": 6,
    "position": "MF",
    "name": "Manu Kone"
  },
  {
    "team": "France",
    "jersey_number": 7,
    "position": "FW",
    "name": "Ousmane Dembele"
  },
  {
    "team": "France",
    "jersey_number": 8,
    "position": "MF",
    "name": "Aurelien Tchouameni"
  },
  {
    "team": "France",
    "jersey_number": 9,
    "position": "FW",
    "name": "Marcus Thuram"
  },
  {
    "team": "France",
    "jersey_number": 10,
    "position": "FW",
    "name": "Kylian Mbappe (C)"
  },
  {
    "team": "France",
    "jersey_number": 11,
    "position": "FW",
    "name": "Michael Olise"
  },
  {
    "team": "France",
    "jersey_number": 12,
    "position": "FW",
    "name": "Bradley Barcola"
  },
  {
    "team": "France",
    "jersey_number": 13,
    "position": "MF",
    "name": "N'Golo Kante"
  },
  {
    "team": "France",
    "jersey_number": 14,
    "position": "MF",
    "name": "Adrien Rabiot"
  },
  {
    "team": "France",
    "jersey_number": 15,
    "position": "DF",
    "name": "Ibrahima Konate"
  },
  {
    "team": "France",
    "jersey_number": 16,
    "position": "GK",
    "name": "Mike Maignan"
  },
  {
    "team": "France",
    "jersey_number": 17,
    "position": "DF",
    "name": "William Saliba"
  },
  {
    "team": "France",
    "jersey_number": 18,
    "position": "MF",
    "name": "Warren Zaire-Emery"
  },
  {
    "team": "France",
    "jersey_number": 19,
    "position": "DF",
    "name": "Theo Hernandez"
  },
  {
    "team": "France",
    "jersey_number": 20,
    "position": "FW",
    "name": "Desire Doue"
  },
  {
    "team": "France",
    "jersey_number": 21,
    "position": "DF",
    "name": "Lucas Hernandez"
  },
  {
    "team": "France",
    "jersey_number": 22,
    "position": "FW",
    "name": "Jean-Philippe Mateta"
  },
  {
    "team": "France",
    "jersey_number": 23,
    "position": "GK",
    "name": "Robin Risser"
  },
  {
    "team": "France",
    "jersey_number": 24,
    "position": "MF",
    "name": "Rayan Cherki"
  },
  {
    "team": "France",
    "jersey_number": 25,
    "position": "MF",
    "name": "Maghnes Akliouche"
  },
  {
    "team": "France",
    "jersey_number": 26,
    "position": "DF",
    "name": "Maxence Lacroix"
  },
  {
    "team": "Iraq",
    "jersey_number": 1,
    "position": "GK",
    "name": "Fahad Talib"
  },
  {
    "team": "Iraq",
    "jersey_number": 2,
    "position": "DF",
    "name": "Rebin Sulaka"
  },
  {
    "team": "Iraq",
    "jersey_number": 3,
    "position": "DF",
    "name": "Hussein Ali"
  },
  {
    "team": "Iraq",
    "jersey_number": 4,
    "position": "DF",
    "name": "Zaid Tahseen"
  },
  {
    "team": "Iraq",
    "jersey_number": 5,
    "position": "DF",
    "name": "Akam Hashim"
  },
  {
    "team": "Iraq",
    "jersey_number": 6,
    "position": "DF",
    "name": "Manaf Younis"
  },
  {
    "team": "Iraq",
    "jersey_number": 7,
    "position": "MF",
    "name": "Youssef Amyn"
  },
  {
    "team": "Iraq",
    "jersey_number": 8,
    "position": "MF",
    "name": "Ibrahim Bayesh"
  },
  {
    "team": "Iraq",
    "jersey_number": 9,
    "position": "FW",
    "name": "Ali Al-Hamadi"
  },
  {
    "team": "Iraq",
    "jersey_number": 10,
    "position": "FW",
    "name": "Mohanad Ali"
  },
  {
    "team": "Iraq",
    "jersey_number": 11,
    "position": "FW",
    "name": "Ahmed Qasem"
  },
  {
    "team": "Iraq",
    "jersey_number": 12,
    "position": "GK",
    "name": "Jalal Hassan (C)"
  },
  {
    "team": "Iraq",
    "jersey_number": 13,
    "position": "FW",
    "name": "Ali Yousif"
  },
  {
    "team": "Iraq",
    "jersey_number": 14,
    "position": "MF",
    "name": "Zidane Iqbal"
  },
  {
    "team": "Iraq",
    "jersey_number": 15,
    "position": "DF",
    "name": "Ahmed Maknzi"
  },
  {
    "team": "Iraq",
    "jersey_number": 16,
    "position": "MF",
    "name": "Amir Al-Ammari"
  },
  {
    "team": "Iraq",
    "jersey_number": 17,
    "position": "FW",
    "name": "Ali Jasim"
  },
  {
    "team": "Iraq",
    "jersey_number": 18,
    "position": "FW",
    "name": "Aymen Hussein"
  },
  {
    "team": "Iraq",
    "jersey_number": 19,
    "position": "MF",
    "name": "Kevin Yakob"
  },
  {
    "team": "Iraq",
    "jersey_number": 20,
    "position": "MF",
    "name": "Aimar Sher"
  },
  {
    "team": "Iraq",
    "jersey_number": 21,
    "position": "FW",
    "name": "Marko Farji"
  },
  {
    "team": "Iraq",
    "jersey_number": 22,
    "position": "GK",
    "name": "Ahmed Basil"
  },
  {
    "team": "Iraq",
    "jersey_number": 23,
    "position": "DF",
    "name": "Merchas Doski"
  },
  {
    "team": "Iraq",
    "jersey_number": 24,
    "position": "MF",
    "name": "Zaid Ismail"
  },
  {
    "team": "Iraq",
    "jersey_number": 25,
    "position": "DF",
    "name": "Mustafa Saadoon"
  },
  {
    "team": "Iraq",
    "jersey_number": 26,
    "position": "DF",
    "name": "Frans Putros"
  },
  {
    "team": "Norway",
    "jersey_number": 1,
    "position": "GK",
    "name": "Ørjan Nyland"
  },
  {
    "team": "Norway",
    "jersey_number": 2,
    "position": "MF",
    "name": "Morten Thorsby"
  },
  {
    "team": "Norway",
    "jersey_number": 3,
    "position": "DF",
    "name": "Kristoffer Ajer"
  },
  {
    "team": "Norway",
    "jersey_number": 4,
    "position": "DF",
    "name": "Leo Østigard"
  },
  {
    "team": "Norway",
    "jersey_number": 5,
    "position": "DF",
    "name": "David Møller Wolfe"
  },
  {
    "team": "Norway",
    "jersey_number": 6,
    "position": "MF",
    "name": "Patrick Berg"
  },
  {
    "team": "Norway",
    "jersey_number": 7,
    "position": "FW",
    "name": "Alexander Sørloth"
  },
  {
    "team": "Norway",
    "jersey_number": 8,
    "position": "MF",
    "name": "Sander Berge"
  },
  {
    "team": "Norway",
    "jersey_number": 9,
    "position": "FW",
    "name": "Erling Haaland"
  },
  {
    "team": "Norway",
    "jersey_number": 10,
    "position": "MF",
    "name": "Martin Ødegaard (C)"
  },
  {
    "team": "Norway",
    "jersey_number": 11,
    "position": "FW",
    "name": "Jørgen Strand Larsen"
  },
  {
    "team": "Norway",
    "jersey_number": 12,
    "position": "GK",
    "name": "Sander Tangvik"
  },
  {
    "team": "Norway",
    "jersey_number": 13,
    "position": "GK",
    "name": "Egil Selvik"
  },
  {
    "team": "Norway",
    "jersey_number": 14,
    "position": "MF",
    "name": "Fredrik Aursnes"
  },
  {
    "team": "Norway",
    "jersey_number": 15,
    "position": "DF",
    "name": "Fredrik Andre Bjørkan"
  },
  {
    "team": "Norway",
    "jersey_number": 16,
    "position": "DF",
    "name": "Marcus Holmgren Pedersen"
  },
  {
    "team": "Norway",
    "jersey_number": 17,
    "position": "DF",
    "name": "Torbjørn Heggem"
  },
  {
    "team": "Norway",
    "jersey_number": 18,
    "position": "MF",
    "name": "Kristian Thorstvedt"
  },
  {
    "team": "Norway",
    "jersey_number": 19,
    "position": "MF",
    "name": "Thelo Aasgaard"
  },
  {
    "team": "Norway",
    "jersey_number": 20,
    "position": "FW",
    "name": "Antonio Nusa"
  },
  {
    "team": "Norway",
    "jersey_number": 21,
    "position": "MF",
    "name": "Andreas Schjelderup"
  },
  {
    "team": "Norway",
    "jersey_number": 22,
    "position": "MF",
    "name": "Oscar Bobb"
  },
  {
    "team": "Norway",
    "jersey_number": 23,
    "position": "MF",
    "name": "Jens Petter Hauge"
  },
  {
    "team": "Norway",
    "jersey_number": 24,
    "position": "DF",
    "name": "Sondre Langas"
  },
  {
    "team": "Norway",
    "jersey_number": 25,
    "position": "DF",
    "name": "Henrik Falchener"
  },
  {
    "team": "Norway",
    "jersey_number": 26,
    "position": "FW",
    "name": "Julian Ryerson"
  },
  {
    "team": "Senegal",
    "jersey_number": 1,
    "position": "GK",
    "name": "Yehvann Diouf"
  },
  {
    "team": "Senegal",
    "jersey_number": 2,
    "position": "DF",
    "name": "Mamadou Sarr"
  },
  {
    "team": "Senegal",
    "jersey_number": 3,
    "position": "DF",
    "name": "Kalidou Koulibaly (C)"
  },
  {
    "team": "Senegal",
    "jersey_number": 4,
    "position": "DF",
    "name": "Abdoulaye Seck"
  },
  {
    "team": "Senegal",
    "jersey_number": 5,
    "position": "MF",
    "name": "Idrissa Gueye"
  },
  {
    "team": "Senegal",
    "jersey_number": 6,
    "position": "MF",
    "name": "Pathe Ciss"
  },
  {
    "team": "Senegal",
    "jersey_number": 7,
    "position": "FW",
    "name": "Assane Diao"
  },
  {
    "team": "Senegal",
    "jersey_number": 8,
    "position": "MF",
    "name": "Lamine Camara"
  },
  {
    "team": "Senegal",
    "jersey_number": 9,
    "position": "FW",
    "name": "Bamba Dieng"
  },
  {
    "team": "Senegal",
    "jersey_number": 10,
    "position": "FW",
    "name": "Sadio Mane"
  },
  {
    "team": "Senegal",
    "jersey_number": 11,
    "position": "FW",
    "name": "Nicolas Jackson"
  },
  {
    "team": "Senegal",
    "jersey_number": 12,
    "position": "FW",
    "name": "Cherif Ndiaye"
  },
  {
    "team": "Senegal",
    "jersey_number": 13,
    "position": "FW",
    "name": "Iliman Ndiaye"
  },
  {
    "team": "Senegal",
    "jersey_number": 14,
    "position": "DF",
    "name": "Ismail Jakobs"
  },
  {
    "team": "Senegal",
    "jersey_number": 15,
    "position": "DF",
    "name": "Krepin Diatta"
  },
  {
    "team": "Senegal",
    "jersey_number": 16,
    "position": "GK",
    "name": "Edouard Mendy"
  },
  {
    "team": "Senegal",
    "jersey_number": 17,
    "position": "MF",
    "name": "Pape Matar Sarr"
  },
  {
    "team": "Senegal",
    "jersey_number": 18,
    "position": "FW",
    "name": "Ismaila Sarr"
  },
  {
    "team": "Senegal",
    "jersey_number": 19,
    "position": "DF",
    "name": "Moussa Niakhate"
  },
  {
    "team": "Senegal",
    "jersey_number": 20,
    "position": "FW",
    "name": "Ibrahim Mbaye"
  },
  {
    "team": "Senegal",
    "jersey_number": 21,
    "position": "MF",
    "name": "Habib Diarra"
  },
  {
    "team": "Senegal",
    "jersey_number": 22,
    "position": "MF",
    "name": "Bara Sapoko Ndiaye"
  },
  {
    "team": "Senegal",
    "jersey_number": 23,
    "position": "GK",
    "name": "Mory Diaw"
  },
  {
    "team": "Senegal",
    "jersey_number": 24,
    "position": "DF",
    "name": "Antoine Mendy"
  },
  {
    "team": "Senegal",
    "jersey_number": 25,
    "position": "DF",
    "name": "El Hadji Malick Diouf"
  },
  {
    "team": "Senegal",
    "jersey_number": 26,
    "position": "MF",
    "name": "Pape Gueye"
  },
  {
    "team": "Algeria",
    "jersey_number": 1,
    "position": "GK",
    "name": "Melvin Mastil"
  },
  {
    "team": "Algeria",
    "jersey_number": 2,
    "position": "DF",
    "name": "Aissa Mandi"
  },
  {
    "team": "Algeria",
    "jersey_number": 3,
    "position": "DF",
    "name": "Achref Abada"
  },
  {
    "team": "Algeria",
    "jersey_number": 4,
    "position": "DF",
    "name": "Mohamed Amine Tougai"
  },
  {
    "team": "Algeria",
    "jersey_number": 5,
    "position": "DF",
    "name": "Zineddine Belaid"
  },
  {
    "team": "Algeria",
    "jersey_number": 6,
    "position": "MF",
    "name": "Ramiz Zerrouki"
  },
  {
    "team": "Algeria",
    "jersey_number": 7,
    "position": "FW",
    "name": "Riyad Mahrez (C)"
  },
  {
    "team": "Algeria",
    "jersey_number": 8,
    "position": "MF",
    "name": "Houssem Aouar"
  },
  {
    "team": "Algeria",
    "jersey_number": 9,
    "position": "FW",
    "name": "Amine Gouiri"
  },
  {
    "team": "Algeria",
    "jersey_number": 10,
    "position": "MF",
    "name": "Fares Chaibi"
  },
  {
    "team": "Algeria",
    "jersey_number": 11,
    "position": "FW",
    "name": "Anis Hadj Moussa"
  },
  {
    "team": "Algeria",
    "jersey_number": 12,
    "position": "FW",
    "name": "Nadhir Benbouali"
  },
  {
    "team": "Algeria",
    "jersey_number": 13,
    "position": "DF",
    "name": "Jaouen Hadjam"
  },
  {
    "team": "Algeria",
    "jersey_number": 14,
    "position": "MF",
    "name": "Hicham Boudaoui"
  },
  {
    "team": "Algeria",
    "jersey_number": 15,
    "position": "DF",
    "name": "Rayan Ait-Nouri"
  },
  {
    "team": "Algeria",
    "jersey_number": 16,
    "position": "GK",
    "name": "Oussama Benbot"
  },
  {
    "team": "Algeria",
    "jersey_number": 17,
    "position": "DF",
    "name": "Rafik Belghali"
  },
  {
    "team": "Algeria",
    "jersey_number": 18,
    "position": "FW",
    "name": "Mohamed Amoura"
  },
  {
    "team": "Algeria",
    "jersey_number": 19,
    "position": "MF",
    "name": "Nabil Bentaleb"
  },
  {
    "team": "Algeria",
    "jersey_number": 20,
    "position": "FW",
    "name": "Adil Boulbina"
  },
  {
    "team": "Algeria",
    "jersey_number": 21,
    "position": "DF",
    "name": "Ramy Bensebaini"
  },
  {
    "team": "Algeria",
    "jersey_number": 22,
    "position": "MF",
    "name": "Ibrahim Maza"
  },
  {
    "team": "Algeria",
    "jersey_number": 23,
    "position": "GK",
    "name": "Luca Zidane"
  },
  {
    "team": "Algeria",
    "jersey_number": 24,
    "position": "MF",
    "name": "Yacine Titraoui"
  },
  {
    "team": "Algeria",
    "jersey_number": 25,
    "position": "FW",
    "name": "Fares Ghedjemis"
  },
  {
    "team": "Algeria",
    "jersey_number": 26,
    "position": "DF",
    "name": "Samir Chergui"
  },
  {
    "team": "Argentina",
    "jersey_number": 1,
    "position": "GK",
    "name": "Juan Musso"
  },
  {
    "team": "Argentina",
    "jersey_number": 3,
    "position": "DF",
    "name": "Nicolas Tagliafico"
  },
  {
    "team": "Argentina",
    "jersey_number": 4,
    "position": "DF",
    "name": "Gonzalo Montiel"
  },
  {
    "team": "Argentina",
    "jersey_number": 5,
    "position": "MF",
    "name": "Leandro Paredes"
  },
  {
    "team": "Argentina",
    "jersey_number": 6,
    "position": "DF",
    "name": "Lisandro Martinez"
  },
  {
    "team": "Argentina",
    "jersey_number": 7,
    "position": "MF",
    "name": "Rodrigo De Paul"
  },
  {
    "team": "Argentina",
    "jersey_number": 8,
    "position": "MF",
    "name": "Valentin Barco"
  },
  {
    "team": "Argentina",
    "jersey_number": 9,
    "position": "FW",
    "name": "Julian Alvarez"
  },
  {
    "team": "Argentina",
    "jersey_number": 10,
    "position": "FW",
    "name": "Lionel Messi (C)"
  },
  {
    "team": "Argentina",
    "jersey_number": 11,
    "position": "MF",
    "name": "Giovani Lo Celso"
  },
  {
    "team": "Argentina",
    "jersey_number": 12,
    "position": "GK",
    "name": "Geronimo Rulli"
  },
  {
    "team": "Argentina",
    "jersey_number": 13,
    "position": "DF",
    "name": "Cristian Romero"
  },
  {
    "team": "Argentina",
    "jersey_number": 14,
    "position": "MF",
    "name": "Exequiel Palacios"
  },
  {
    "team": "Argentina",
    "jersey_number": 15,
    "position": "MF",
    "name": "Nicolas Gonzalez"
  },
  {
    "team": "Argentina",
    "jersey_number": 16,
    "position": "FW",
    "name": "Thiago Almada"
  },
  {
    "team": "Argentina",
    "jersey_number": 17,
    "position": "FW",
    "name": "Giuliano Simeone"
  },
  {
    "team": "Argentina",
    "jersey_number": 18,
    "position": "FW",
    "name": "Nico Paz"
  },
  {
    "team": "Argentina",
    "jersey_number": 19,
    "position": "DF",
    "name": "Nicolas Otamendi"
  },
  {
    "team": "Argentina",
    "jersey_number": 20,
    "position": "MF",
    "name": "Alexis Mac Allister"
  },
  {
    "team": "Argentina",
    "jersey_number": 21,
    "position": "FW",
    "name": "Jose Manuel Lopez"
  },
  {
    "team": "Argentina",
    "jersey_number": 22,
    "position": "FW",
    "name": "Lautaro Martinez"
  },
  {
    "team": "Argentina",
    "jersey_number": 23,
    "position": "GK",
    "name": "Emiliano Martinez"
  },
  {
    "team": "Argentina",
    "jersey_number": 24,
    "position": "MF",
    "name": "Enzo Fernandez"
  },
  {
    "team": "Argentina",
    "jersey_number": 25,
    "position": "DF",
    "name": "Facundo Medina"
  },
  {
    "team": "Argentina",
    "jersey_number": 26,
    "position": "DF",
    "name": "Nahuel Molina"
  },
  {
    "team": "Austria",
    "jersey_number": 1,
    "position": "GK",
    "name": "Alexander Schlager"
  },
  {
    "team": "Austria",
    "jersey_number": 2,
    "position": "DF",
    "name": "David Affengruber"
  },
  {
    "team": "Austria",
    "jersey_number": 3,
    "position": "DF",
    "name": "Kevin Danso"
  },
  {
    "team": "Austria",
    "jersey_number": 4,
    "position": "MF",
    "name": "Xaver Schlager"
  },
  {
    "team": "Austria",
    "jersey_number": 5,
    "position": "DF",
    "name": "Stefan Posch"
  },
  {
    "team": "Austria",
    "jersey_number": 6,
    "position": "MF",
    "name": "Nicolas Seiwald"
  },
  {
    "team": "Austria",
    "jersey_number": 7,
    "position": "FW",
    "name": "Marko Arnautovic"
  },
  {
    "team": "Austria",
    "jersey_number": 8,
    "position": "DF",
    "name": "David Alaba (C)"
  },
  {
    "team": "Austria",
    "jersey_number": 9,
    "position": "MF",
    "name": "Marcel Sabitzer"
  },
  {
    "team": "Austria",
    "jersey_number": 10,
    "position": "MF",
    "name": "Florian Grillitsch"
  },
  {
    "team": "Austria",
    "jersey_number": 11,
    "position": "FW",
    "name": "Michael Gregoritsch"
  },
  {
    "team": "Austria",
    "jersey_number": 12,
    "position": "GK",
    "name": "Florian Wiegele"
  },
  {
    "team": "Austria",
    "jersey_number": 13,
    "position": "GK",
    "name": "Patrick Pentz"
  },
  {
    "team": "Austria",
    "jersey_number": 14,
    "position": "FW",
    "name": "Sasa Kalajdzic"
  },
  {
    "team": "Austria",
    "jersey_number": 15,
    "position": "DF",
    "name": "Philipp Lienhart"
  },
  {
    "team": "Austria",
    "jersey_number": 16,
    "position": "DF",
    "name": "Phillipp Mwene"
  },
  {
    "team": "Austria",
    "jersey_number": 17,
    "position": "MF",
    "name": "Carney Chukwuemeka"
  },
  {
    "team": "Austria",
    "jersey_number": 18,
    "position": "MF",
    "name": "Romano Schmid"
  },
  {
    "team": "Austria",
    "jersey_number": 20,
    "position": "MF",
    "name": "Konrad Laimer"
  },
  {
    "team": "Austria",
    "jersey_number": 21,
    "position": "FW",
    "name": "Patrick Wimmer"
  },
  {
    "team": "Austria",
    "jersey_number": 22,
    "position": "MF",
    "name": "Alexander Prass"
  },
  {
    "team": "Austria",
    "jersey_number": 23,
    "position": "DF",
    "name": "Marco Friedl"
  },
  {
    "team": "Austria",
    "jersey_number": 24,
    "position": "MF",
    "name": "Paul Wanner"
  },
  {
    "team": "Austria",
    "jersey_number": 25,
    "position": "DF",
    "name": "Michael Svoboda"
  },
  {
    "team": "Austria",
    "jersey_number": 26,
    "position": "MF",
    "name": "Alessandro Schopf"
  },
  {
    "team": "Jordan",
    "jersey_number": 1,
    "position": "GK",
    "name": "Yazeed Abulaila"
  },
  {
    "team": "Jordan",
    "jersey_number": 2,
    "position": "DF",
    "name": "Mohammad Abu Hashish"
  },
  {
    "team": "Jordan",
    "jersey_number": 3,
    "position": "DF",
    "name": "Abdallah Nasib"
  },
  {
    "team": "Jordan",
    "jersey_number": 4,
    "position": "DF",
    "name": "Husam Abu Dahab"
  },
  {
    "team": "Jordan",
    "jersey_number": 5,
    "position": "DF",
    "name": "Yazan Al-Arab"
  },
  {
    "team": "Jordan",
    "jersey_number": 6,
    "position": "MF",
    "name": "Amer Jamous"
  },
  {
    "team": "Jordan",
    "jersey_number": 7,
    "position": "FW",
    "name": "Mohammad Abu Zrayq"
  },
  {
    "team": "Jordan",
    "jersey_number": 8,
    "position": "MF",
    "name": "Noor Al-Rawabdeh"
  },
  {
    "team": "Jordan",
    "jersey_number": 9,
    "position": "FW",
    "name": "Ali Olwan"
  },
  {
    "team": "Jordan",
    "jersey_number": 10,
    "position": "FW",
    "name": "Musa Al-Taamari"
  },
  {
    "team": "Jordan",
    "jersey_number": 11,
    "position": "FW",
    "name": "Odeh Al-Fakhouri"
  },
  {
    "team": "Jordan",
    "jersey_number": 12,
    "position": "GK",
    "name": "Nour Bani Attiah"
  },
  {
    "team": "Jordan",
    "jersey_number": 13,
    "position": "FW",
    "name": "Mahmoud Al-Mardi"
  },
  {
    "team": "Jordan",
    "jersey_number": 14,
    "position": "MF",
    "name": "Rajaei Ayed"
  },
  {
    "team": "Jordan",
    "jersey_number": 15,
    "position": "MF",
    "name": "Ibrahim Sadeh"
  },
  {
    "team": "Jordan",
    "jersey_number": 16,
    "position": "DF",
    "name": "Mo Abualnadi"
  },
  {
    "team": "Jordan",
    "jersey_number": 17,
    "position": "DF",
    "name": "Salim Obaid"
  },
  {
    "team": "Jordan",
    "jersey_number": 18,
    "position": "DF",
    "name": "Mohammad Taha"
  },
  {
    "team": "Jordan",
    "jersey_number": 19,
    "position": "DF",
    "name": "Saed Al-Rosan"
  },
  {
    "team": "Jordan",
    "jersey_number": 20,
    "position": "MF",
    "name": "Mohannad Abu Taha"
  },
  {
    "team": "Jordan",
    "jersey_number": 21,
    "position": "MF",
    "name": "Nizar Al-Rashdan"
  },
  {
    "team": "Jordan",
    "jersey_number": 22,
    "position": "GK",
    "name": "Abdallah Al-Fakhouri"
  },
  {
    "team": "Jordan",
    "jersey_number": 23,
    "position": "DF",
    "name": "Ihsan Haddad (C)"
  },
  {
    "team": "Jordan",
    "jersey_number": 24,
    "position": "FW",
    "name": "Ali Azaizeh"
  },
  {
    "team": "Jordan",
    "jersey_number": 25,
    "position": "MF",
    "name": "Mohammad Al-Dawoud"
  },
  {
    "team": "Jordan",
    "jersey_number": 26,
    "position": "DF",
    "name": "Anas Badawi"
  },
  {
    "team": "Colombia",
    "jersey_number": 1,
    "position": "GK",
    "name": "David Ospina"
  },
  {
    "team": "Colombia",
    "jersey_number": 2,
    "position": "DF",
    "name": "Daniel Munoz"
  },
  {
    "team": "Colombia",
    "jersey_number": 3,
    "position": "DF",
    "name": "Jhon Lucumi"
  },
  {
    "team": "Colombia",
    "jersey_number": 4,
    "position": "DF",
    "name": "Santiago Arias"
  },
  {
    "team": "Colombia",
    "jersey_number": 5,
    "position": "MF",
    "name": "Kevin Castano"
  },
  {
    "team": "Colombia",
    "jersey_number": 6,
    "position": "MF",
    "name": "Richard Rios"
  },
  {
    "team": "Colombia",
    "jersey_number": 7,
    "position": "FW",
    "name": "Luis Diaz"
  },
  {
    "team": "Colombia",
    "jersey_number": 8,
    "position": "MF",
    "name": "Jorge Carrascal"
  },
  {
    "team": "Colombia",
    "jersey_number": 9,
    "position": "FW",
    "name": "Jhon Cordoba"
  },
  {
    "team": "Colombia",
    "jersey_number": 10,
    "position": "MF",
    "name": "James Rodriguez (C)"
  },
  {
    "team": "Colombia",
    "jersey_number": 11,
    "position": "MF",
    "name": "Jhon Arias"
  },
  {
    "team": "Colombia",
    "jersey_number": 12,
    "position": "GK",
    "name": "Camilo Vargas"
  },
  {
    "team": "Colombia",
    "jersey_number": 13,
    "position": "DF",
    "name": "Yerry Mina"
  },
  {
    "team": "Colombia",
    "jersey_number": 14,
    "position": "DF",
    "name": "Gustavo Puerta"
  },
  {
    "team": "Colombia",
    "jersey_number": 15,
    "position": "MF",
    "name": "Juan Portilla"
  },
  {
    "team": "Colombia",
    "jersey_number": 16,
    "position": "MF",
    "name": "Jefferson Lerma"
  },
  {
    "team": "Colombia",
    "jersey_number": 17,
    "position": "DF",
    "name": "Johan Mojica"
  },
  {
    "team": "Colombia",
    "jersey_number": 18,
    "position": "DF",
    "name": "Willer Ditta"
  },
  {
    "team": "Colombia",
    "jersey_number": 19,
    "position": "FW",
    "name": "Cucho Hernandez"
  },
  {
    "team": "Colombia",
    "jersey_number": 20,
    "position": "MF",
    "name": "Juan Fernando Quintero"
  },
  {
    "team": "Colombia",
    "jersey_number": 21,
    "position": "FW",
    "name": "Jaminton Campaz"
  },
  {
    "team": "Colombia",
    "jersey_number": 22,
    "position": "DF",
    "name": "Deiver Machado"
  },
  {
    "team": "Colombia",
    "jersey_number": 23,
    "position": "DF",
    "name": "Davinson Sanchez"
  },
  {
    "team": "Colombia",
    "jersey_number": 24,
    "position": "GK",
    "name": "Alvaro Montero"
  },
  {
    "team": "Colombia",
    "jersey_number": 25,
    "position": "FW",
    "name": "Luis Suarez"
  },
  {
    "team": "Colombia",
    "jersey_number": 26,
    "position": "FW",
    "name": "Andres Gomez"
  },
  {
    "team": "DR Congo",
    "jersey_number": 1,
    "position": "GK",
    "name": "Lionel Mpasi"
  },
  {
    "team": "DR Congo",
    "jersey_number": 2,
    "position": "DF",
    "name": "Aaron Wan-Bissaka"
  },
  {
    "team": "DR Congo",
    "jersey_number": 3,
    "position": "DF",
    "name": "Steve Kapuadi"
  },
  {
    "team": "DR Congo",
    "jersey_number": 4,
    "position": "DF",
    "name": "Axel Tuanzebe"
  },
  {
    "team": "DR Congo",
    "jersey_number": 5,
    "position": "DF",
    "name": "Dylan Batubinsika"
  },
  {
    "team": "DR Congo",
    "jersey_number": 6,
    "position": "MF",
    "name": "Ngal'ayel Mukau"
  },
  {
    "team": "DR Congo",
    "jersey_number": 7,
    "position": "MF",
    "name": "Nathanael Mbuku"
  },
  {
    "team": "DR Congo",
    "jersey_number": 8,
    "position": "MF",
    "name": "Samuel Moutoussamy"
  },
  {
    "team": "DR Congo",
    "jersey_number": 9,
    "position": "FW",
    "name": "Brian Cipenga"
  },
  {
    "team": "DR Congo",
    "jersey_number": 10,
    "position": "MF",
    "name": "Theo Bongonda"
  },
  {
    "team": "DR Congo",
    "jersey_number": 11,
    "position": "FW",
    "name": "Gael Kakuta"
  },
  {
    "team": "DR Congo",
    "jersey_number": 12,
    "position": "DF",
    "name": "Joris Kayembe"
  },
  {
    "team": "DR Congo",
    "jersey_number": 13,
    "position": "FW",
    "name": "Meschak Elia"
  },
  {
    "team": "DR Congo",
    "jersey_number": 14,
    "position": "MF",
    "name": "Noah Sadiki"
  },
  {
    "team": "DR Congo",
    "jersey_number": 15,
    "position": "MF",
    "name": "Aaron Tshibola"
  },
  {
    "team": "DR Congo",
    "jersey_number": 16,
    "position": "GK",
    "name": "Timothy Fayulu"
  },
  {
    "team": "DR Congo",
    "jersey_number": 17,
    "position": "FW",
    "name": "Cedric Bakambu"
  },
  {
    "team": "DR Congo",
    "jersey_number": 18,
    "position": "MF",
    "name": "Charles Pickel"
  },
  {
    "team": "DR Congo",
    "jersey_number": 19,
    "position": "FW",
    "name": "Fiston Mayele"
  },
  {
    "team": "DR Congo",
    "jersey_number": 20,
    "position": "FW",
    "name": "Yoane Wissa"
  },
  {
    "team": "DR Congo",
    "jersey_number": 21,
    "position": "GK",
    "name": "Matthieu Epolo"
  },
  {
    "team": "DR Congo",
    "jersey_number": 22,
    "position": "DF",
    "name": "Chancel Mbemba (C)"
  },
  {
    "team": "DR Congo",
    "jersey_number": 23,
    "position": "FW",
    "name": "Simon Banza"
  },
  {
    "team": "DR Congo",
    "jersey_number": 24,
    "position": "DF",
    "name": "Gedeon Kalulu"
  },
  {
    "team": "DR Congo",
    "jersey_number": 25,
    "position": "MF",
    "name": "Edo Kayembe"
  },
  {
    "team": "DR Congo",
    "jersey_number": 26,
    "position": "DF",
    "name": "Arthur Masuaku"
  },
  {
    "team": "Portugal",
    "jersey_number": 1,
    "position": "GK",
    "name": "Diogo Costa"
  },
  {
    "team": "Portugal",
    "jersey_number": 2,
    "position": "DF",
    "name": "Nelson Semedo"
  },
  {
    "team": "Portugal",
    "jersey_number": 3,
    "position": "DF",
    "name": "Ruben Dias"
  },
  {
    "team": "Portugal",
    "jersey_number": 4,
    "position": "DF",
    "name": "Tomas Araujo"
  },
  {
    "team": "Portugal",
    "jersey_number": 5,
    "position": "DF",
    "name": "Diogo Dalot"
  },
  {
    "team": "Portugal",
    "jersey_number": 6,
    "position": "MF",
    "name": "Matheus Nunes"
  },
  {
    "team": "Portugal",
    "jersey_number": 7,
    "position": "FW",
    "name": "Cristiano Ronaldo (C)"
  },
  {
    "team": "Portugal",
    "jersey_number": 8,
    "position": "MF",
    "name": "Bruno Fernandes"
  },
  {
    "team": "Portugal",
    "jersey_number": 9,
    "position": "FW",
    "name": "Goncalo Ramos"
  },
  {
    "team": "Portugal",
    "jersey_number": 10,
    "position": "MF",
    "name": "Bernardo Silva"
  },
  {
    "team": "Portugal",
    "jersey_number": 11,
    "position": "FW",
    "name": "Joao Felix"
  },
  {
    "team": "Portugal",
    "jersey_number": 12,
    "position": "GK",
    "name": "Jose Sa"
  },
  {
    "team": "Portugal",
    "jersey_number": 13,
    "position": "DF",
    "name": "Renato Veiga"
  },
  {
    "team": "Portugal",
    "jersey_number": 14,
    "position": "DF",
    "name": "Goncalo Inacio"
  },
  {
    "team": "Portugal",
    "jersey_number": 15,
    "position": "MF",
    "name": "Joao Neves"
  },
  {
    "team": "Portugal",
    "jersey_number": 16,
    "position": "FW",
    "name": "Francisco Trincao"
  },
  {
    "team": "Portugal",
    "jersey_number": 17,
    "position": "FW",
    "name": "Rafael Leao"
  },
  {
    "team": "Portugal",
    "jersey_number": 18,
    "position": "FW",
    "name": "Pedro Neto"
  },
  {
    "team": "Portugal",
    "jersey_number": 19,
    "position": "FW",
    "name": "Goncalo Guedes"
  },
  {
    "team": "Portugal",
    "jersey_number": 20,
    "position": "DF",
    "name": "Joao Cancelo"
  },
  {
    "team": "Portugal",
    "jersey_number": 21,
    "position": "MF",
    "name": "Ruben Neves"
  },
  {
    "team": "Portugal",
    "jersey_number": 22,
    "position": "GK",
    "name": "Rui Silva"
  },
  {
    "team": "Portugal",
    "jersey_number": 23,
    "position": "MF",
    "name": "Vitinha"
  },
  {
    "team": "Portugal",
    "jersey_number": 24,
    "position": "DF",
    "name": "Samu Costa"
  },
  {
    "team": "Portugal",
    "jersey_number": 25,
    "position": "DF",
    "name": "Nuno Mendes"
  },
  {
    "team": "Portugal",
    "jersey_number": 26,
    "position": "FW",
    "name": "Francisco Conceicao"
  },
  {
    "team": "Uzbekistan",
    "jersey_number": 1,
    "position": "GK",
    "name": "Utkir Yusupov"
  },
  {
    "team": "Uzbekistan",
    "jersey_number": 2,
    "position": "DF",
    "name": "Abdukodir Khusanov"
  },
  {
    "team": "Uzbekistan",
    "jersey_number": 3,
    "position": "DF",
    "name": "Khojiakbar Alijonov"
  },
  {
    "team": "Uzbekistan",
    "jersey_number": 4,
    "position": "DF",
    "name": "Farrukh Sayfiev"
  },
  {
    "team": "Uzbekistan",
    "jersey_number": 5,
    "position": "DF",
    "name": "Rustam Ashurmatov"
  },
  {
    "team": "Uzbekistan",
    "jersey_number": 6,
    "position": "MF",
    "name": "Akmal Mozgovoy"
  },
  {
    "team": "Uzbekistan",
    "jersey_number": 7,
    "position": "MF",
    "name": "Otabek Shukurov"
  },
  {
    "team": "Uzbekistan",
    "jersey_number": 8,
    "position": "MF",
    "name": "Jamshid Iskanderov"
  },
  {
    "team": "Uzbekistan",
    "jersey_number": 9,
    "position": "MF",
    "name": "Odiljon Hamrobekov"
  },
  {
    "team": "Uzbekistan",
    "jersey_number": 10,
    "position": "MF",
    "name": "Jaloliddin Masharipov"
  },
  {
    "team": "Uzbekistan",
    "jersey_number": 11,
    "position": "MF",
    "name": "Oston Urunov"
  },
  {
    "team": "Uzbekistan",
    "jersey_number": 12,
    "position": "GK",
    "name": "Abduvohid Nematov"
  },
  {
    "team": "Uzbekistan",
    "jersey_number": 13,
    "position": "DF",
    "name": "Sherzod Nasrullaev"
  },
  {
    "team": "Uzbekistan",
    "jersey_number": 14,
    "position": "FW",
    "name": "Eldor Shomurodov (C)"
  },
  {
    "team": "Uzbekistan",
    "jersey_number": 15,
    "position": "DF",
    "name": "Umar Eshmurodov"
  },
  {
    "team": "Uzbekistan",
    "jersey_number": 16,
    "position": "GK",
    "name": "Botirali Ergashev"
  },
  {
    "team": "Uzbekistan",
    "jersey_number": 17,
    "position": "MF",
    "name": "Dostonbek Khamdamov"
  },
  {
    "team": "Uzbekistan",
    "jersey_number": 18,
    "position": "DF",
    "name": "Abdulla Abdullaev"
  },
  {
    "team": "Uzbekistan",
    "jersey_number": 19,
    "position": "MF",
    "name": "Azizjon Ganiev"
  },
  {
    "team": "Uzbekistan",
    "jersey_number": 20,
    "position": "FW",
    "name": "Azizbek Amonov"
  },
  {
    "team": "Uzbekistan",
    "jersey_number": 21,
    "position": "FW",
    "name": "Igor Sergeev"
  },
  {
    "team": "Uzbekistan",
    "jersey_number": 22,
    "position": "MF",
    "name": "Abbosbek Fayzullaev"
  },
  {
    "team": "Uzbekistan",
    "jersey_number": 23,
    "position": "MF",
    "name": "Sherzod Esanov"
  },
  {
    "team": "Uzbekistan",
    "jersey_number": 24,
    "position": "DF",
    "name": "Bekhruz Karimov"
  },
  {
    "team": "Uzbekistan",
    "jersey_number": 25,
    "position": "DF",
    "name": "Avazbek Ulmasaliev"
  },
  {
    "team": "Uzbekistan",
    "jersey_number": 26,
    "position": "DF",
    "name": "Jakhongir Urozov"
  },
  {
    "team": "Croatia",
    "jersey_number": 1,
    "position": "GK",
    "name": "Dominik Livakovic"
  },
  {
    "team": "Croatia",
    "jersey_number": 2,
    "position": "DF",
    "name": "Josip Stanisic"
  },
  {
    "team": "Croatia",
    "jersey_number": 3,
    "position": "DF",
    "name": "Marin Pongracic"
  },
  {
    "team": "Croatia",
    "jersey_number": 4,
    "position": "DF",
    "name": "Josko Gvardiol"
  },
  {
    "team": "Croatia",
    "jersey_number": 5,
    "position": "DF",
    "name": "Duje Caleta-Car"
  },
  {
    "team": "Croatia",
    "jersey_number": 6,
    "position": "DF",
    "name": "Josip Sutalo"
  },
  {
    "team": "Croatia",
    "jersey_number": 7,
    "position": "MF",
    "name": "Nikola Moro"
  },
  {
    "team": "Croatia",
    "jersey_number": 8,
    "position": "MF",
    "name": "Mateo Kovacic"
  },
  {
    "team": "Croatia",
    "jersey_number": 9,
    "position": "FW",
    "name": "Andrej Kramaric"
  },
  {
    "team": "Croatia",
    "jersey_number": 10,
    "position": "MF",
    "name": "Luka Modric (C)"
  },
  {
    "team": "Croatia",
    "jersey_number": 11,
    "position": "FW",
    "name": "Ante Budimir"
  },
  {
    "team": "Croatia",
    "jersey_number": 12,
    "position": "GK",
    "name": "Ivor Pandur"
  },
  {
    "team": "Croatia",
    "jersey_number": 13,
    "position": "MF",
    "name": "Nikola Vlasic"
  },
  {
    "team": "Croatia",
    "jersey_number": 14,
    "position": "FW",
    "name": "Ivan Perisic"
  },
  {
    "team": "Croatia",
    "jersey_number": 15,
    "position": "MF",
    "name": "Mario Pasalic"
  },
  {
    "team": "Croatia",
    "jersey_number": 16,
    "position": "MF",
    "name": "Martin Baturina"
  },
  {
    "team": "Croatia",
    "jersey_number": 17,
    "position": "MF",
    "name": "Petar Sucic"
  },
  {
    "team": "Croatia",
    "jersey_number": 18,
    "position": "DF",
    "name": "Kristijan Jakic"
  },
  {
    "team": "Croatia",
    "jersey_number": 19,
    "position": "MF",
    "name": "Toni Fruk"
  },
  {
    "team": "Croatia",
    "jersey_number": 20,
    "position": "FW",
    "name": "Igor Matanovic"
  },
  {
    "team": "Croatia",
    "jersey_number": 21,
    "position": "MF",
    "name": "Luka Sucic"
  },
  {
    "team": "Croatia",
    "jersey_number": 22,
    "position": "DF",
    "name": "Luka Vuskovic"
  },
  {
    "team": "Croatia",
    "jersey_number": 23,
    "position": "GK",
    "name": "Dominik Kotarski"
  },
  {
    "team": "Croatia",
    "jersey_number": 24,
    "position": "FW",
    "name": "Marco Pasalic"
  },
  {
    "team": "Croatia",
    "jersey_number": 25,
    "position": "DF",
    "name": "Martin Erlic"
  },
  {
    "team": "Croatia",
    "jersey_number": 26,
    "position": "FW",
    "name": "Petar Musa"
  },
  {
    "team": "England",
    "jersey_number": 1,
    "position": "GK",
    "name": "Jordan Pickford"
  },
  {
    "team": "England",
    "jersey_number": 2,
    "position": "DF",
    "name": "Ezri Konsa"
  },
  {
    "team": "England",
    "jersey_number": 3,
    "position": "DF",
    "name": "Nico O'Reilly"
  },
  {
    "team": "England",
    "jersey_number": 4,
    "position": "MF",
    "name": "Declan Rice"
  },
  {
    "team": "England",
    "jersey_number": 5,
    "position": "DF",
    "name": "John Stones"
  },
  {
    "team": "England",
    "jersey_number": 6,
    "position": "DF",
    "name": "Marc Guehi"
  },
  {
    "team": "England",
    "jersey_number": 7,
    "position": "FW",
    "name": "Bukayo Saka"
  },
  {
    "team": "England",
    "jersey_number": 8,
    "position": "MF",
    "name": "Elliot Anderson"
  },
  {
    "team": "England",
    "jersey_number": 9,
    "position": "FW",
    "name": "Harry Kane (C)"
  },
  {
    "team": "England",
    "jersey_number": 10,
    "position": "MF",
    "name": "Jude Bellingham"
  },
  {
    "team": "England",
    "jersey_number": 11,
    "position": "FW",
    "name": "Marcus Rashford"
  },
  {
    "team": "England",
    "jersey_number": 12,
    "position": "DF",
    "name": "Tino Livramento"
  },
  {
    "team": "England",
    "jersey_number": 13,
    "position": "GK",
    "name": "Dean Henderson"
  },
  {
    "team": "England",
    "jersey_number": 14,
    "position": "MF",
    "name": "Jordan Henderson"
  },
  {
    "team": "England",
    "jersey_number": 15,
    "position": "DF",
    "name": "Dan Burn"
  },
  {
    "team": "England",
    "jersey_number": 16,
    "position": "MF",
    "name": "Kobbie Mainoo"
  },
  {
    "team": "England",
    "jersey_number": 17,
    "position": "MF",
    "name": "Morgan Rogers"
  },
  {
    "team": "England",
    "jersey_number": 18,
    "position": "FW",
    "name": "Anthony Gordon"
  },
  {
    "team": "England",
    "jersey_number": 19,
    "position": "FW",
    "name": "Ollie Watkins"
  },
  {
    "team": "England",
    "jersey_number": 20,
    "position": "FW",
    "name": "Noni Madueke"
  },
  {
    "team": "England",
    "jersey_number": 21,
    "position": "MF",
    "name": "Eberechi Eze"
  },
  {
    "team": "England",
    "jersey_number": 22,
    "position": "FW",
    "name": "Ivan Toney"
  },
  {
    "team": "England",
    "jersey_number": 23,
    "position": "GK",
    "name": "James Trafford"
  },
  {
    "team": "England",
    "jersey_number": 24,
    "position": "DF",
    "name": "Reece James"
  },
  {
    "team": "England",
    "jersey_number": 25,
    "position": "DF",
    "name": "Djed Spence"
  },
  {
    "team": "England",
    "jersey_number": 26,
    "position": "DF",
    "name": "Jarell Quansah"
  },
  {
    "team": "Ghana",
    "jersey_number": 1,
    "position": "GK",
    "name": "Lawrence Ati-Zigi"
  },
  {
    "team": "Ghana",
    "jersey_number": 2,
    "position": "DF",
    "name": "Alidu Seidu"
  },
  {
    "team": "Ghana",
    "jersey_number": 3,
    "position": "MF",
    "name": "Caleb Yirenkyi"
  },
  {
    "team": "Ghana",
    "jersey_number": 4,
    "position": "DF",
    "name": "Jonas Adjetey"
  },
  {
    "team": "Ghana",
    "jersey_number": 5,
    "position": "MF",
    "name": "Thomas Partey"
  },
  {
    "team": "Ghana",
    "jersey_number": 6,
    "position": "DF",
    "name": "Abdul Mumin"
  },
  {
    "team": "Ghana",
    "jersey_number": 7,
    "position": "FW",
    "name": "Abdul Fatawu"
  },
  {
    "team": "Ghana",
    "jersey_number": 8,
    "position": "MF",
    "name": "Kwasi Sibo"
  },
  {
    "team": "Ghana",
    "jersey_number": 9,
    "position": "FW",
    "name": "Jordan Ayew (C)"
  },
  {
    "team": "Ghana",
    "jersey_number": 10,
    "position": "FW",
    "name": "Brandon Thomas-Asante"
  },
  {
    "team": "Ghana",
    "jersey_number": 11,
    "position": "MF",
    "name": "Antoine Semenyo"
  },
  {
    "team": "Ghana",
    "jersey_number": 12,
    "position": "GK",
    "name": "Joseph Anang"
  },
  {
    "team": "Ghana",
    "jersey_number": 13,
    "position": "FW",
    "name": "Christopher Bonsu Baah"
  },
  {
    "team": "Ghana",
    "jersey_number": 14,
    "position": "DF",
    "name": "Gideon Mensah"
  },
  {
    "team": "Ghana",
    "jersey_number": 15,
    "position": "MF",
    "name": "Elisha Owusu"
  },
  {
    "team": "Ghana",
    "jersey_number": 16,
    "position": "GK",
    "name": "Benjamin Asare"
  },
  {
    "team": "Ghana",
    "jersey_number": 17,
    "position": "DF",
    "name": "Abdul Rahman Baba"
  },
  {
    "team": "Ghana",
    "jersey_number": 18,
    "position": "DF",
    "name": "Jerome Opoku"
  },
  {
    "team": "Ghana",
    "jersey_number": 19,
    "position": "FW",
    "name": "Inaki Williams"
  },
  {
    "team": "Ghana",
    "jersey_number": 20,
    "position": "MF",
    "name": "Augustine Boakye"
  },
  {
    "team": "Ghana",
    "jersey_number": 21,
    "position": "DF",
    "name": "Kojo Peprah Oppong"
  },
  {
    "team": "Ghana",
    "jersey_number": 22,
    "position": "FW",
    "name": "Kamaldeen Sulemana"
  },
  {
    "team": "Ghana",
    "jersey_number": 23,
    "position": "DF",
    "name": "Derrick Luckassen"
  },
  {
    "team": "Ghana",
    "jersey_number": 24,
    "position": "FW",
    "name": "Ernest Nuamah"
  },
  {
    "team": "Ghana",
    "jersey_number": 25,
    "position": "FW",
    "name": "Prince Kwabena Adu"
  },
  {
    "team": "Ghana",
    "jersey_number": 26,
    "position": "DF",
    "name": "Marvin Senaya"
  },
  {
    "team": "Panama",
    "jersey_number": 1,
    "position": "GK",
    "name": "Luis Mejia"
  },
  {
    "team": "Panama",
    "jersey_number": 2,
    "position": "DF",
    "name": "Cesar Blackman"
  },
  {
    "team": "Panama",
    "jersey_number": 3,
    "position": "DF",
    "name": "Jose Cordoba"
  },
  {
    "team": "Panama",
    "jersey_number": 4,
    "position": "DF",
    "name": "Fidel Escobar"
  },
  {
    "team": "Panama",
    "jersey_number": 5,
    "position": "DF",
    "name": "Edgardo Farina"
  },
  {
    "team": "Panama",
    "jersey_number": 6,
    "position": "MF",
    "name": "Cristian Martinez"
  },
  {
    "team": "Panama",
    "jersey_number": 7,
    "position": "MF",
    "name": "Jose Luis Rodriguez"
  },
  {
    "team": "Panama",
    "jersey_number": 8,
    "position": "MF",
    "name": "Adalberto Carrasquilla"
  },
  {
    "team": "Panama",
    "jersey_number": 9,
    "position": "FW",
    "name": "Tomas Rodriguez"
  },
  {
    "team": "Panama",
    "jersey_number": 10,
    "position": "MF",
    "name": "Ismael Diaz"
  },
  {
    "team": "Panama",
    "jersey_number": 11,
    "position": "MF",
    "name": "Yoel Barcenas"
  },
  {
    "team": "Panama",
    "jersey_number": 12,
    "position": "GK",
    "name": "Cesar Samudio"
  },
  {
    "team": "Panama",
    "jersey_number": 13,
    "position": "DF",
    "name": "Jiovany Ramos"
  },
  {
    "team": "Panama",
    "jersey_number": 14,
    "position": "DF",
    "name": "Carlos Harvey"
  },
  {
    "team": "Panama",
    "jersey_number": 15,
    "position": "DF",
    "name": "Eric Davis"
  },
  {
    "team": "Panama",
    "jersey_number": 16,
    "position": "DF",
    "name": "Andres Andrade"
  },
  {
    "team": "Panama",
    "jersey_number": 17,
    "position": "FW",
    "name": "Jose Fajardo"
  },
  {
    "team": "Panama",
    "jersey_number": 18,
    "position": "FW",
    "name": "Cecilio Waterman"
  },
  {
    "team": "Panama",
    "jersey_number": 19,
    "position": "MF",
    "name": "Alberto Quintero"
  },
  {
    "team": "Panama",
    "jersey_number": 20,
    "position": "MF",
    "name": "Anibal Godoy (C)"
  },
  {
    "team": "Panama",
    "jersey_number": 21,
    "position": "MF",
    "name": "Cesar Yanis"
  },
  {
    "team": "Panama",
    "jersey_number": 22,
    "position": "GK",
    "name": "Orlando Mosquera"
  },
  {
    "team": "Panama",
    "jersey_number": 23,
    "position": "DF",
    "name": "Michael Amir Murillo"
  },
  {
    "team": "Panama",
    "jersey_number": 24,
    "position": "FW",
    "name": "Azarias Londono"
  },
  {
    "team": "Panama",
    "jersey_number": 25,
    "position": "DF",
    "name": "Roderick Miller"
  },
  {
    "team": "Panama",
    "jersey_number": 26,
    "position": "DF",
    "name": "Jorge Gutierrez"
  }
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

            player, created = Player.objects.update_or_create(
                team=team,
                jersey_number=data['jersey_number'],
                defaults={
                    'name': data['name'],
                    'position': data['position'],
                },
            )
            status = 'created' if created else 'updated'
            self.stdout.write(f'{player.name} ({team.name}) — {status}')
