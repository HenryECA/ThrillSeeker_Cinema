from django.test import TestCase
from .models import Film
from django.urls import reverse
from rest_framework import status
import json
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class CreateFilmTest(TestCase):

    def test_create_film(self):
        url = reverse('film-create')
        data = {
            'title': 'New Film',
            'director': 'New Director',
            'genre': 'New Genre',
            'release_year': 2023,
            'length': 100,
            'producer': 'New Producer',
            'summary': 'New Summary',
            'rt_score': 5,
            'actors': ["Actor A", "Actor B", "Actor C"],
            'language': 'New Language',
            'img_link': 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Example.jpg'
        }
        response = self.client.post(
            url,
            data=json.dumps(data),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], 'New Film')

class GetFilmByNameTest(TestCase):

    def setUp(self):
        self.film = Film.objects.create(
            title='Test Film',
            director='Test Director',
            genre='Test Genre',
            release_year=2022,
            length=120,
            producer='Test Producer',
            summary='Test Summary',
            rt_score=4,
            actors=["Actor 1", "Actor 2", "Actor 3"],
            language='Test Language',
            img_link='https://upload.wikimedia.org/wikipedia/commons/a/a9/Example.jpg'
        )

    def test_get_film_by_name(self):
        url = reverse('film-detail', args=[self.film.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Test Film')


class DeleteFilmTest(TestCase):

    def setUp(self):
        # Crear un usuario y un token asociado para la autenticación
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.token = Token.objects.create(user=self.user)
        self.film = Film.objects.create(
            title='Delete Test Film',
            director='Test Director',
            genre='Test Genre',
            release_year=2022,
            length=120,
            producer='Test Producer',
            summary='Test Summary',
            rt_score=4,
            actors=["Actor 1", "Actor 2", "Actor 3"],
            language='Test Language',
            img_link='https://upload.wikimedia.org/wikipedia/commons/a/a9/Example.jpg'
        )

    def test_delete_film(self):
        url = reverse('film-delete', args=[self.film.id])
        # Incluir el token en las cookies de la solicitud
        self.client.cookies['session'] = self.token.key
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Film.objects.filter(id=self.film.id).exists())


class UpdateFilmTest(TestCase):

    def setUp(self):
        # Crear un usuario y un token asociado para la autenticación
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.token = Token.objects.create(user=self.user)
        self.film = Film.objects.create(
            title='Original Title',
            director='Original Director',
            genre='Original Genre',
            release_year=2022,
            length=120,
            producer='Original Producer',
            summary='Original Summary',
            rt_score=4,
            actors=["Actor 1", "Actor 2", "Actor 3"],
            language='Original Language',
            img_link='https://upload.wikimedia.org/wikipedia/commons/a/a9/Example.jpg'
        )

    def test_update_film(self):
        url = reverse('film-update', args=[self.film.id])
        updated_data = {
            'title': 'Updated Title',
            'director': 'Updated Director'
        }
        # Incluir el token en las cookies de la solicitud
        self.client.cookies['session'] = self.token.key
        response = self.client.patch(
            url,
            data=json.dumps(updated_data),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.film.refresh_from_db()
        self.assertEqual(self.film.title, 'Updated Title')
        self.assertEqual(self.film.director, 'Updated Director')