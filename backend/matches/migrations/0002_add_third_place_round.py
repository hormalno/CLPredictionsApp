from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('matches', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='match',
            name='round',
            field=models.CharField(
                choices=[
                    ('GS', 'Group Stage'),
                    ('PO', 'Play-Off'),
                    ('R32', 'Round of 32'),
                    ('R16', 'Round of 16'),
                    ('QF', 'Quarter Final'),
                    ('SF', 'Semi Final'),
                    ('3P', '3rd Place'),
                    ('F', 'Final'),
                ],
                max_length=10,
            ),
        ),
    ]
