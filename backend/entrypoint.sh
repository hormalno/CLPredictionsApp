#!/bin/sh
set -e

echo "Running migrations..."
python manage.py migrate

echo "Seeding teams..."
python manage.py seed_teams

echo "Seeding groups..."
python manage.py seed_groups

echo "Seeding players..."
python manage.py seed_players

echo "Seeding matches..."
python manage.py seed_matches

echo "Seeding knockout matches..."
python manage.py seed_knockout_matches

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Starting server..."
gunicorn app.wsgi:application --bind 0.0.0.0:8000
