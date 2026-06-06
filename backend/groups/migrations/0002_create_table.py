from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('groups', '0001_initial'),
        ('teams', '0001_initial'),
    ]

    operations = [
        migrations.SeparateDatabaseAndState(
            database_operations=[
                migrations.RunSQL(
                    sql="""
                        CREATE TABLE IF NOT EXISTS groups_group (
                            id bigserial PRIMARY KEY,
                            name varchar(1) NOT NULL UNIQUE,
                            next_p1 integer NOT NULL,
                            next_p2 integer NOT NULL,
                            next_p3 jsonb NOT NULL DEFAULT '[]'
                        );
                        CREATE TABLE IF NOT EXISTS groups_group_teams (
                            id bigserial PRIMARY KEY,
                            group_id bigint NOT NULL REFERENCES groups_group(id) ON DELETE CASCADE,
                            team_id bigint NOT NULL REFERENCES teams_team(id) ON DELETE CASCADE,
                            UNIQUE (group_id, team_id)
                        );
                    """,
                    reverse_sql="DROP TABLE IF EXISTS groups_group_teams; DROP TABLE IF EXISTS groups_group;",
                ),
            ],
            state_operations=[],
        ),
    ]
