from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.UserRegistrationView.as_view(), name='user-registration'),
    path('register/options/', views.options_view, name='options_view'),
    # create a new URL for calculating student information
    path('api/calculate_student_info/', views.CalculateStudentInfoView.as_view(), name='calculate-student-info'),
]