from django.test import TestCase
from models import Film, Actors, Language

class FilmTestCase(TestCase):

    def setUp(self):
        actor = Actors.objects.create(name='Test Actor')
        language = Language.objects.create(name='English')

        film = Film.objects.create(
            title='Test Film',
            director='Test Director',
            genre='Test Genre',
            release_year=2022,
            length=120,
            producer='Test Producer',
            summary='Test Summary',
            rt_score=100,
            img_link='https://upload.wikimedia.org/wikipedia/commons/a/a9/Example.jpg'
        )
        film.actors.add(actor)
        film.languages.add(language)

    def test_film(self):
        film = Film.objects.get(id=1)
        excepted_object_name = f'{film.title}'
        self.assertEqual(excepted_object_name, 'Test Film')