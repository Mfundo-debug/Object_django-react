import os
from django.shortcuts import redirect
from google.oauth2 import id_token
from google.auth.transport import requests
from rest_framework.response import Response
from rest_framework import status
from .models import User

CLIENT_ID = os.environ.get('CLIENT_ID')

def google_login(request):
    #Handles POST requests here
    token = request.data.get('token')
    try:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
        # ID token is valid. Get the user's Google Account ID from the decoded token.
        user_id = idinfo['sub']
        #check if user exists in the database
        try:
            user = User.objects.get(user_id=user_id)
            #handle user found scenario here
            return Response({'message': 'User found!', 'user_id': user.user_id})
        except User.DoesNotExist:
            #handle user not found scenario here
            return Response({'message': 'User not found!'}, status=status.HTTP_404_NOT_FOUND)
    except ValueError:
        # Invalid token
        return Response({'message': 'Invalid token!'}, status=status.HTTP_400_BAD_REQUEST)