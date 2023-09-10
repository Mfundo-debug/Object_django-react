from django.shortcuts import render
from rest_framework import generics
from .models import User
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
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
        return super().post(request, *args, **kwargs)
       
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
        

        user = User(
            first_name=first_name,
            last_name=last_name,
            email_address=email_address,
            residential_address=residential_address,
            student_identity_number=student_identity_number,
            
        )
        user.save()
        #Return a JSON response with a status code of 201 created
        return JsonResponse({'message': 'User created successfully!'}, status=status.HTTP_201_CREATED)
    else:
        #Return a JSON response with a status code of 405 method not allowed
        return JsonResponse({'message': 'This is a POST request!'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
