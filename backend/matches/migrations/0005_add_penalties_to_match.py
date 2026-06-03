from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('matches', '0004_alter_match_round'),
    ]

    operations = [
        migrations.AddField(
            model_name='match',
            name='home_penalties',
            field=models.PositiveSmallIntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='match',
            name='away_penalties',
            field=models.PositiveSmallIntegerField(blank=True, null=True),
        ),
    ]
