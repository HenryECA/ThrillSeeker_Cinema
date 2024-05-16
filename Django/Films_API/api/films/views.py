from rest_framework import generics, status
from rest_framework.response import Response
from django.core.exceptions import ValidationError, PermissionDenied, ObjectDoesNotExist
from .models import Film
from .serializers import FilmSerializer
from rest_framework.authtoken.models import Token
from rest_framework.pagination import LimitOffsetPagination
from django_filters.rest_framework import DjangoFilterBackend


class FilmCreateView(generics.CreateAPIView):
    serializer_class = FilmSerializer

    def handle_exception(self, exc):
        if isinstance(exc, ValidationError):
            return Response(status=status.HTTP_409_CONFLICT, data={'error': str(exc)})
        else:
            return super().handle_exception(exc)


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


class FilmDetailView(generics.RetrieveAPIView):
    queryset = Film.objects.all()
    serializer_class = FilmSerializer


class FilmUpdateView(generics.UpdateAPIView):

    serializer_class = FilmSerializer

    def patch(self, request, *args, **kwargs):
        try:
            token = Token.objects.get(key=self.request.COOKIES.get('session'))
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        if token is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        film = token.user.film_set.get(pk=kwargs['pk'])

        serializer = self.get_serializer(film, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


    def handle_exception(self, exc):
        if isinstance(exc, ObjectDoesNotExist):
            return Response(status=status.HTTP_409_CONFLICT, data={'error': 'Film not found'})
        else:
            return super().handle_exception(exc)


class FilmDeleteView(generics.DestroyAPIView):
 
    serializer_class = FilmSerializer

    def get_object(self):
        try:
            token = Token.objects.get(key=self.request.COOKIES.get('session'))
        except ObjectDoesNotExist:
            raise PermissionDenied()

        if token is None:
            raise PermissionDenied()

        try:
            return Film.objects.get(pk=self.kwargs['pk'])
        except Film.DoesNotExist:
            raise ObjectDoesNotExist("Film not found")
    
    def delete(self, request, *args, **kwargs):
        film = self.get_object()
        film.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def handle_exception(self, exc):
        if isinstance(exc, ObjectDoesNotExist):
            return Response(status=status.HTTP_409_CONFLICT, data={'error': 'Film not found'})
        else:
            return super().handle_exception(exc)