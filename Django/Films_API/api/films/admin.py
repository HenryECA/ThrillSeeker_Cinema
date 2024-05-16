from django.contrib import admin
from .models import Film


@admin.register(Film)
class FilmAdmin(admin.ModelAdmin):
    list_display = ('title', 'director', 'genre', 'release_year', 'rt_score', 'user_reviews')
    search_fields = ('title', 'director', 'genre')
    list_filter = ('genre', 'release_year', 'rt_score')
    ordering = ('title',)

    # Mostrar los actores y el idioma en la vista de lista
    def actors_list(self, obj):
        return ", ".join(obj.actors)

    actors_list.short_description = 'Actors'

        # Mostrar un resumen de las reseñas de usuarios en la vista de lista
    def user_reviews(self, obj):
        if obj.user_reviews:
            return ", ".join([f"{review['user']}: {review['review']}" for review in obj.user_review])
        return "No reviews"

    user_reviews.short_description = 'User Reviews'
