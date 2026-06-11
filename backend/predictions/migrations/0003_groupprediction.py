import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('groups', '0003_group_slot_p1_group_slot_p2_group_slot_p3'),
        ('predictions', '0002_topscorerprediction_points'),
        ('teams', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='GroupPrediction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('group_winner_correct', models.BooleanField(blank=True, null=True)),
                ('points', models.PositiveIntegerField(default=0)),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='predictions', to='groups.group')),
                ('group_winner_predict', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='group_winner_predictions', to='teams.team')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='group_predictions', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('group', 'user')},
            },
        ),
    ]
