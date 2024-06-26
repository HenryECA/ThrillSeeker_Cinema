# Generated by Django 4.2.11 on 2024-05-15 16:33

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Film",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=256, unique=True)),
                ("director", models.CharField(default="Unknown", max_length=256)),
                ("genre", models.CharField(default="Unknown", max_length=256)),
                ("release_year", models.IntegerField()),
                ("length", models.IntegerField(default=0)),
                ("producer", models.CharField(max_length=256)),
                ("summary", models.TextField()),
                ("rt_score", models.IntegerField(default=0)),
                ("actors", models.JSONField()),
                ("language", models.CharField(default="Unknown", max_length=256)),
                ("img_link", models.URLField()),
            ],
        ),
    ]
