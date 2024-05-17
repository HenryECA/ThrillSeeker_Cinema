from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model

User = get_user_model()

class UserAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            "username": "qop",
            "email": "qp@a.com",
            "password": "abc12345",
            "phone": "1234567890",
            "name": "Enrique",
            "admin": True
        }

        self.user_data2 = {
            "username": "qop2",
            "email": "qop2@gmail.com",
            "password": "abc12345",
            "phone": "1234567890",
            "name": "Enrique",
            "admin": False
        }



        self.login_data = {
            "username": "qop",
            "password": "abc12345"
        }

    def test_register_user(self):
        response = self.client.post('/api/users/', self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_login_user(self):
        self.client.post('/api/users/', self.user_data, format='json')
        response = self.client.post('/api/users/login/', self.login_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('session', response.cookies)

    def test_get_user_profile(self):
        self.client.post('/api/users/', self.user_data, format='json')
        response = self.client.post('/api/users/login/', self.login_data, format='json')
        self.client.cookies['session'] = response.cookies['session']
        response = self.client.get('/api/users/me/profile')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], 'qop')

    def test_update_user_profile(self):
        self.client.post('/api/users/', self.user_data, format='json')
        response = self.client.post('/api/users/login/', self.login_data, format='json')
        self.client.cookies['session'] = response.cookies['session']
        update_data = {
            "name": "no",
            "phone": "0987654321"
        }
        response = self.client.patch('/api/users/me/update/', update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'no')
        self.assertEqual(response.data['phone'], '0987654321')

    def test_logout_user(self):
        self.client.post('/api/users/', self.user_data, format='json')
        response = self.client.post('/api/users/login/', self.login_data, format='json')
        self.client.cookies['session'] = response.cookies['session']
        response = self.client.delete('/api/users/logout/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_user(self):
        self.client.post('/api/users/', self.user_data, format='json')
        response = self.client.post('/api/users/login/', self.login_data, format='json')
        self.client.cookies['session'] = response.cookies['session']
        response = self.client.delete('/api/users/me/destroy/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_get_all_users(self):
        self.client.post('/api/users/', self.user_data, format='json')
        response = self.client.post('/api/users/login/', self.login_data, format='json')
        self.client.cookies['session'] = response.cookies['session']
        response = self.client.get('/api/users/list/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) > 0)

    def test_patch_user_by_admin(self):
        self.client.post('/api/users/', self.user_data, format='json')
        self.client.post('/api/users/', self.user_data2, format='json')


        response = self.client.post('/api/users/login/', self.login_data, format='json')
        self.client.cookies['session'] = response.cookies['session']
        update_data = {
            "name": "nop",
        }
        response = self.client.patch('/api/users/me/update/qop2/', update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'nop')