from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import ValidationError
from django.db.utils import IntegrityError
from django.core.exceptions import ObjectDoesNotExist
from api.users import serializers
from drf_spectacular.utils import extend_schema, OpenApiResponse
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import generics, status
from rest_framework.exceptions import PermissionDenied
from rest_framework.authtoken.models import Token
from . import serializers
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from . import models

class RegisterView(generics.CreateAPIView):
    # Ejercicio 13 y 15

    serializer_class = serializers.UserSerializer

    def handle_exception(self, exc):

        if isinstance(exc, ValidationError):
            return Response(status=status.HTTP_409_CONFLICT, data={'error': str(exc)})
        else:
            return super().handle_exception(exc)
        

class LoginView(generics.CreateAPIView):

  serializer_class = serializers.LoginSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)

    if serializer.is_valid():
      token, created = Token.objects.get_or_create(user=serializer.validated_data)

      if token is None:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

      response = Response()
      # Add the token to the response with secure flag enabled
      response.set_cookie(
          key='session',
          value=token.key,
          secure=True,  # Ensure transmission over HTTPS only
          httponly=False,  # Prevent access from Javascript (recommended)
          samesite="None"  # Send cookie with same-site requests (Lax is more relaxed)
      )
      return response

    return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)


class ProfileView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.UserSerializer

    def get_object(self):
        
        print('Hello')

        print(self.request.headers)
        
        try: 
            token = Token.objects.get(key=self.request.COOKIES.get('session'))
            print(token)
        except ObjectDoesNotExist:
            raise PermissionDenied()

        if token is None:
            raise PermissionDenied()

        return token.user



class UpdateProfileView(generics.UpdateAPIView):
    serializer_class = serializers.UserSerializer
    
    def patch(self, request, *args, **kwargs):
        
        try:

            token = Token.objects.get(key=request.COOKIES.get('session'))
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        print(token)
        
        user = token.user

        if user is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        print(kwargs)

        username_param = kwargs.get('username')

        print(username_param)
        print(request.data)

        if username_param is not None:
            # Means that the user is trying to update another user. Check if the user is an admin
            if user.admin is False:
                return Response(status=status.HTTP_403_FORBIDDEN)
            user_change = models.User.objects.get(username=username_param)
            serializer = self.get_serializer(user_change, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        
        else:

            serializer = self.get_serializer(user, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
    
    def handle_exception(self, exc):
            
        if isinstance(exc, ValidationError):
            return Response(status=status.HTTP_409_CONFLICT, data={'error': str(exc)})
        else:
            return super().handle_exception(exc)

class DeleteProfileView(generics.DestroyAPIView):
    
    serializer_class = serializers.UserSerializer    

    def get_object(self):

        try: 
            token = Token.objects.get(key=self.request.COOKIES.get('session'))
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        if token is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        user = token.user

        return user
    
    def delete(self, request, *args, **kwargs):
            
        user = self.get_object()
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


    def handle_exception(self, exc):

        if isinstance(exc, ObjectDoesNotExist):
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        else:
            return super().handle_exception(exc)

        

class LogoutView(generics.DestroyAPIView):

    def delete(self, request, *args, **kwargs):
        try:
            print(request.headers)
            token = Token.objects.get(key=request.COOKIES.get('session'))
            print(token)
            token.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def handle_exception(self, exc):

        if isinstance(exc, ObjectDoesNotExist):
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        else:
            return super().handle_exception(exc)
    

class UserListView(generics.ListCreateAPIView):
    serializer_class = serializers.UserSerializer

    def get_queryset(self):
        
        try:
            token = Token.objects.get(key=self.request.COOKIES.get('session'))
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        if token is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        user = token.user

        if user.admin is False or user is None:
            return Response(status=status.HTTP_403_FORBIDDEN)
        

        # get all the users
        return models.User.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def handle_exception(self, exc):
        if isinstance(exc, ObjectDoesNotExist):
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        print('Hello')
        print(exc)
        return super().handle_exception(exc)

