from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    dob = serializers.DateField()
    class Meta:
        model = User
        fields = '__all__'

    def to_representation(self, instance):
        return super().to_representation(instance)
