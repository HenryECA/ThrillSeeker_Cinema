"""
URL configuration for api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
import api.users.views as user_views
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView




urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    path("api/users/", user_views.RegisterView.as_view(), name="register"),
    path("api/users/login/", user_views.LoginView.as_view(), name="login"),
    path("api/users/logout/", user_views.LogoutView.as_view(), name="logout"),
    path("api/users/me/profile", user_views.ProfileView.as_view(), name="me"),
    path("api/users/me/update/", user_views.UpdateProfileView.as_view(), name="me_update"),
    path("api/users/me/destroy/", user_views.DeleteProfileView.as_view(), name="me_destroy"),
    path("api/users/logout/", user_views.LogoutView.as_view(), name="logout"),   
]
