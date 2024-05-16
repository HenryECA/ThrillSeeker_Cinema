import re
from rest_framework import serializers, exceptions
from django.contrib.auth import authenticate
from api.users import models

class UserSerializer(serializers.ModelSerializer):

    class Meta:

        model = models.User
        fields = ['username', 'email', 'name', 'phone', 'password', 'admin', 'created_at']
        extra_kwargs = {
            'password': {'write_only': True}, 
            'admin': {'default': False},
        }

    def validate_password(self, value):

        if not re.match(r'^(?=.[0-9])(?=.[A-Z])(?=.[a-z]).$', value) and len(value) < 8:

            raise exceptions.ValidationError('Invalid password format')

        return value
    
    def validate_username(self, value):
        if not re.match(r'^[a-zA-Z0-9_]+$', value):
            raise exceptions.ValidationError('Invalid username format')
        return value
    
    def validate_email(self, value):
        if not re.match(r'^[a-zA-Z0-9_]+@[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+$', value):
            raise exceptions.ValidationError('Invalid email format')
        return value
    
    def create(self, validated_data):

        user = models.User.objects.create_user(**validated_data)
        user.save()

        return user
    
    def update(self, instance, validated_data):

        password = validated_data.pop('password', None)
        for key, value in validated_data.items():
            setattr(instance, key, value)
        if password is not None:
            instance.set_password(password)
        instance.save()

        return instance

    

    
class LoginSerializer(serializers.Serializer):

    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
    
        username = data.get('username', None)
        password = data.get('password', None)
        
        if username is None or password is None:
            raise exceptions.ValidationError('Email and password are required')

        user = authenticate(username=username, password=password)

        if user is None:
            raise exceptions.AuthenticationFailed('Invalid username or password')
        
        return user
    

    



        