from rest_framework import generics
from .models import Film
from .serializers import FilmSerializer
from rest_framework.pagination import LimitOffsetPagination
from django_filters.rest_framework import DjangoFilterBackend

class FilmListView(generics.ListAPIView):
    queryset = Film.objects.all()
    serializer_class = FilmSerializer
    pagination_class = LimitOffsetPagination
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'title': ['icontains'],
        'director': ['icontains'],
        'genre': ['icontains'],
        'release_year': ['gte', 'lte'],
        'length': ['lte'],
        'rt_score': ['gte'],
        'language': ['icontains']
    }


