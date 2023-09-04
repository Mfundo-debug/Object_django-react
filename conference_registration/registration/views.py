from django.shortcuts import render
from rest_framework import generics
from .models import User
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status
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