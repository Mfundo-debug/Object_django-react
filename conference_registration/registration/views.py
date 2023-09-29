from django.shortcuts import render,redirect
from rest_framework import generics
from .models import User
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import random
import datetime
from django.http import HttpResponse
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.db.models import Q
# Create your views here.
class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        """
        Handles GET requests here, if needed
        you can use request.query_params to access query parameters
        for example, you can check if a user with specific student ID exists
        """
        student_number = request.query_params.get('student_number')
        if student_number:
            try:
                user = User.objects.get(student_identity_number=student_number)
                #handle user found scenario here
                return Response({'message': 'User found!', 'user_id': user.student_identity_number})
            except User.DoesNotExist:
                #handler user not found scenario here
                return Response({'message': 'User not found!'}, status=status.HTTP_404_NOT_FOUND)
        else:
            #handle other GET requests here if needed
            return Response({'message': 'This is a GET request!'})
       
    

    def post(self, request, *args, **kwargs):
        #Handles POST requests here
        user_number = User.generate_user_number()
        #include the user_number in the request data
        request.data['user_number'] = user_number
        return super().post(request, *args, **kwargs)

def options_view(request):
    #Handles OPTIONS requests here
    return HttpResponse()


def ID_validation(student_identity_number, dob, gender, country):
        #Check if the provided ID matches the South African format
        if len(student_identity_number) == 13 and student_identity_number.isdigit():
            #extract the relevant components from the ID
            dob_str = student_identity_number[:6]
            gender_digit = int(student_identity_number[6])
            nationality_indicator = int(student_identity_number[10])

            #calculate birthdate
            year = int("19" + dob_str[:2]) #Assume that year in 20th century
            month = int(dob_str[2:4])
            day = int(dob_str[4:])
            birthdate = datetime.date(year, month, day)

            #calculate age
            today = datetime.date.today()
            age = today.year - birthdate.year - ((today.month, today.day) < (birthdate.month, birthdate.day))

            #determine gender
            gender = "Male" if gender_digit >=5 else "Female"

            #determine nationality
            nationality = "South African" if nationality_indicator == 0 else "Permanent Resident"

            #For South African IDs, the country is South Africa
            country = "South Africa"

            return student_identity_number, age, gender, nationality, country
        else:
            #function to calulcate age from date of birth (dob should in YYYYMMDD format)
            def calculate_age_from_dob(dob):
                dob_date =datetime.datetime.strptime(dob, '%Y%m%d').date()
                today = datetime.date.today()
                age = today.year - dob_date.year - ((today.month, today.day) < (dob_date.month, dob_date.day))
                return age
            #If the ID does not match the South African format, use the provided input
            return student_identity_number, calculate_age_from_dob(dob), gender, "Other", country    
@csrf_exempt
def validate_user(request):
    if request.method == 'POST':
        student_identity_number = request.POST.get('student_identity_number')
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        if student_identity_number or (first_name and last_name):
            # Check if a user with the provided ID or names exists
            try:
                if student_identity_number:
                    user = User.objects.get(student_identity_number=student_identity_number)
                else:
                    user = User.objects.get(Q(first_name=first_name) & Q(last_name=last_name))
                #needs a fix
                user_data = {
                    'user_id': user.student_identity_number,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'email_address': user.email_address,
                    'residential_address': user.residential_address,
                    'dob': user.dob,
                }
                return JsonResponse({'message': 'User found!', 'user_data': user_data})
            except User.DoesNotExist:
                return JsonResponse({'message': 'User not found!'}, status=404)
        
        else:
            return JsonResponse({'message': 'Please provide either ID or names!'}, status=400)

    else:
        return JsonResponse({'message': 'This is a POST request!'}, status=405)

@csrf_exempt
def user_registration(request):
    if request.method == 'POST':
        #Retrieve data from the POST request body
        data = json.loads(request.body)
        first_name = data.get('first_name', "")
        last_name = data.get('last_name', "")
        email_address = data.get('email_address', "")
        residential_address = data.get('residential_address', "")
        student_identity_number = data.get('student_identity_number', "")
        dob = data.get('dob', "")
        gender = data.get('gender', "")
        country = data.get('country', "")
        age = data.get('age', "")
        nationality = data.get('nationality', "")

         # Call the ID_validation function to process the student_identity_number
        student_identity_number, age, gender, nationality, country = ID_validation(student_identity_number, dob, gender, country)

        user = User(
            first_name=first_name,
            last_name=last_name,
            email_address=email_address,
            residential_address=residential_address,
            student_identity_number=student_identity_number,
            dob=dob,
            gender = gender,
            country = country,
            age = age,
            nationality=nationality,
            
        )
        user.save()
        #Return a JSON response with a status code of 201 created
        return JsonResponse({'message': 'User created successfully!'}, status=status.HTTP_201_CREATED)
    else:
        #Return a JSON response with a status code of 405 method not allowed
        return JsonResponse({'message': 'This is a POST request!'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

#create a new API endpoint to calculate student information
class CalculateStudentInfoView(generics.CreateAPIView):
    def post(self, request, *args, **kwargs):
        student_identity_number = request.data.get('student_identity_number')
        dob, age, gender, _ = ID_validation(student_identity_number)
        return Response({"dob": dob, "age": age, "gender": gender})    
