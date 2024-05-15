from django.db import models


class Film(models.Model):
    title = models.CharField(max_length=256, unique=True)
    director = models.CharField(max_length=256, default='Unknown')
    genre = models.CharField(max_length=256, default='Unknown')
    release_year = models.IntegerField()
    length = models.IntegerField(default=0)
    producer = models.CharField(max_length=256)
    summary = models.TextField()
    rt_score = models.IntegerField(default=0)
    actors = models.JSONField()  # Almacenar actores como una lista JSON
    language = models.CharField(max_length=256, default='Unknown')
    img_link = models.URLField()

    def __str__(self):
        return self.title