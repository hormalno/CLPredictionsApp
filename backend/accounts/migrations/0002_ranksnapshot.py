import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='RankSnapshot',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rank', models.PositiveIntegerField()),
                ('points', models.PositiveIntegerField()),
                ('taken_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(
                    on_delete=django.db.models.deletion.CASCADE,
                    related_name='rank_snapshots',
                    to=settings.AUTH_USER_MODEL,
                )),
            ],
            options={
                'ordering': ['-taken_at'],
                'indexes': [
                    models.Index(fields=['user', '-taken_at'], name='accounts_ra_user_id_taken_at_idx'),
                ],
            },
        ),
    ]
