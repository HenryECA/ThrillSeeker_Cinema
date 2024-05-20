from django.contrib import admin
from .models import Film


@admin.register(Film)
class FilmAdmin(admin.ModelAdmin):
    list_display = ('title', 'director', 'genre', 'release_year', 'rt_score')
    search_fields = ('title', 'director', 'genre')
    list_filter = ('genre', 'release_year', 'rt_score')
    ordering = ('title',)

    # Mostrar los actores y el idioma en la vista de lista
    def actors_list(self, obj):
        return ", ".join(obj.actors)

    actors_list.short_description = 'Actors'

    list_display = ('title', 'director', 'genre', 'release_year', 'rt_score', 'actors_list')