from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    # Ejercicio 2

    # Campos
    username = models.CharField(max_length=128, unique=True)
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=256)
    phone = models.CharField(max_length=32)
    password = models.CharField(max_length=128)
    admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    # Admin user can only be created by another admin user or by the superuser (by post)

    def save(self, *args, **kwargs):
       
        if not self.username:
            self.username = self.email
        
        super().save(*args, **kwargs)