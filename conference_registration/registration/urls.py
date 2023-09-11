from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.UserRegistrationView.as_view(), name='user-registration'),
    path('register/options/', views.options_view, name='options_view'),
]