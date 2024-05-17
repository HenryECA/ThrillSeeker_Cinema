from rest_framework import generics, status
from .models import Film
from .serializers import FilmSerializer
from rest_framework.response import Response
from rest_framework.pagination import LimitOffsetPagination
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, status
from rest_framework.response import Response
from django.core.exceptions import ValidationError, PermissionDenied, ObjectDoesNotExist
from .models import Film
from .serializers import FilmSerializer
from rest_framework.authtoken.models import Token
from rest_framework.pagination import LimitOffsetPagination
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

class FilmListView(generics.ListAPIView):
    queryset = Film.objects.all()
    serializer_class = FilmSerializer
    pagination_class = LimitOffsetPagination
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = {
        'title': ['icontains'],
        'director': ['icontains'],
        'genre': ['icontains'],
        'release_year': ['gte', 'lte'],
        'length': ['lte'],
        'rt_score': ['gte'],
        'language': ['icontains']
    }
    ordering_fields = ['title', 'release_year', 'length', 'rt_score']
    ordering = ['id']

    def get_queryset(self):
        queryset = Film.objects.all()
        print(f"Query params: {self.request.query_params}")  # Debug print statement to check the query parameters
        ordering = self.request.query_params.get('ordering')
        
        if ordering:
            valid_ordering_fields = [field for field in self.ordering_fields]
            # Handle ordering for ascending and descending order dynamically
            if ordering.lstrip('-') in valid_ordering_fields:
                queryset = queryset.order_by(ordering)
        
        print(f"Ordering by: {ordering}")  # Debug print statement to check the ordering parameter
        return queryset
    
    def list(self, request, *args, **kwargs):
        # Check if the 'limit' parameter is present in the request
        if 'limit' not in request.query_params:
            # Disable pagination if 'limit' parameter is not specified
            self.pagination_class = None
        
        # Call the default 'list' method to retrieve and return the response
        return super().list(request, *args, **kwargs)


class FilmUserReviews(generics.RetrieveUpdateAPIView):
    queryset = Film.objects.all()
    serializer_class = FilmSerializer
    lookup_field = 'title'

    def patch(self, request, *args, **kwargs):
        data = request.data
        film_title = data.get('film')
        user_name = data.get('user')
        rating = float(data.get('rating'))

        if not (film_title and user_name and rating):
            return Response({'error': 'Invalid request data'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            film_obj = Film.objects.get(title=film_title)
        except Film.DoesNotExist:
            return Response({'error': 'Film not found'}, status=status.HTTP_404_NOT_FOUND)
        
        film_obj.user_reviews[user_name] = rating
        average_rating = self.calculate_average_rating(film_obj.user_reviews.values())
        film_obj.rt_score = average_rating
        film_obj.save()

        serializer = self.get_serializer(film_obj)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def calculate_average_rating(self, ratings):
        if not ratings:
            return 0
        total = sum(ratings)
        return total / len(ratings)
        
        
class FilmCreateView(generics.CreateAPIView):
    serializer_class = FilmSerializer

    def handle_exception(self, exc):
        if isinstance(exc, ValidationError):
            return Response(status=status.HTTP_409_CONFLICT, data={'error': str(exc)})
        else:
            return super().handle_exception(exc)


# class FilmListView(generics.ListAPIView):
#     queryset = Film.objects.all()
#     serializer_class = FilmSerializer
#     pagination_class = LimitOffsetPagination
#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = {
#         'title': ['icontains'],
#         'director': ['icontains'],
#         'genre': ['icontains'],
#         'release_year': ['gte', 'lte'],
#         'length': ['lte'],
#         'rt_score': ['gte'],
#         'language': ['icontains']
#     }




class FilmDetailView(generics.RetrieveAPIView):
    queryset = Film.objects.all()
    serializer_class = FilmSerializer


class FilmUpdateView(generics.UpdateAPIView):

    serializer_class = FilmSerializer

    def patch(self, request, *args, **kwargs):
        # try:
        #     token = Token.objects.get(key=self.request.COOKIES.get('session'))
        # except ObjectDoesNotExist:
        #     return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # if token is None:
        #     return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # film = token.user.film_set.get(pk=kwargs['pk'])

        print(kwargs['pk'])
        film = Film.objects.get(pk=kwargs['pk'])

        if film is None:
            return Response(status=status.HTTP_404_NOT_FOUND, data={'error': 'Film not found'})

        serializer = self.get_serializer(film, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


    def handle_exception(self, exc):
        if isinstance(exc, ObjectDoesNotExist):
            return Response(status=status.HTTP_404_NOT_FOUND, data={'error': 'Film not found'})
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
        film = Film.objects.get(pk=kwargs['pk'])
        film.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def handle_exception(self, exc):
        if isinstance(exc, ObjectDoesNotExist):
            return Response(status=status.HTTP_409_CONFLICT, data={'error': 'Film not found'})
        else:
            return super().handle_exception(exc)

