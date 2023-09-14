from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.utils import timezone
from datetime import datetime
import random
# Create your models here.
class User(models.Model):
    NEW_STUDENT = 'New Student'
    RETURNING_STUDENT = 'Returning Student'
    STUDENT_STATUS_CHOICES = [
        (NEW_STUDENT, 'New Student'),
        (RETURNING_STUDENT, 'Returning Student'),
    ]
    student_status = models.CharField(
        max_length=20,
        choices=STUDENT_STATUS_CHOICES,
        default=NEW_STUDENT,
    )
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
    ]
    COUNTRY_CHOICES = [
        ('South Africa', 'South Africa'),
        ('USA', 'USA'),
        ('UK', 'UK'),
        ('Canada', 'Canada'),
        ('Australia', 'Australia'),
        ('Botswana','Botswana'),
        ('Zimbabwe', 'Zimbabwe'),
        ('Germany','Germany'),
        ('France','France'),
        ('Japan','Japan'),
        ('Nigeria','Nigeria'),
        ('Kenya','Kenya'),
        ('Ghana','Ghana'),
        ('Congo','Congo'),
        ('Egypt','Egypt'),
        ('Ethiopia','Ethiopia'),
        ('Morocco','Morocco'),
        ('India','India'),
        ('Russia','Russia'),
        ('Brazil','Brazil'),
        ('Mexico','Mexico'),
        ('Argentina','Argentina'),
        ('Other','Other'),
    ]
    @staticmethod
    def generate_user_number():
        #get current date and time components
        current_datetime = datetime.now()
        formatted_datetime = current_datetime.strftime("%y%m%d%H%M%S")
        #generate a random four digits
        random_digits = str(random.randint(1000,9999))
        #combine all components to form the user number
        user_number = formatted_datetime + random_digits
        return user_number


    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email_address = models.EmailField(max_length=254)
    residential_address = models.CharField(max_length=100)
    student_identity_number = models.CharField(max_length=10, unique=True)
    system_email = models.EmailField(max_length=254, blank=True, null=True)
    dob = models.DateField(default=timezone.now)
    gender = models.CharField(max_length=10, null=True, choices=GENDER_CHOICES)
    country = models.CharField(max_length=30, null=True, choices=COUNTRY_CHOICES)
    nationality = models.CharField(max_length=30, null=True)
    age = models.IntegerField(null=True)
    user_number = models.CharField(max_length=16, default=generate_user_number, unique=True)


    def generate_system_email(first_name, last_name):
        if " " in first_name:
            first_name_initial = "".join([name[0] for name in first_name.split()])
        else:
            first_name_initial = first_name[0]
        email_prefix = f"{last_name}{first_name_initial}"
        email_suffix = ""

        while True:
            system_email = f"{email_prefix}{email_suffix}@SmartSystem.com"
            if not User.objects.filter(system_email=system_email).exists():
                return system_email
        # Increment the email_suffix
            if not email_suffix:
                email_suffix = "01"
            else:
                email_suffix = f"{int(email_suffix) + 1:02d}"

    
    @receiver(pre_save, sender='registration.User')
    def generate_and_assign_system_email(sender, instance, *args, **kwargs):
        if not instance.system_email:
            instance.system_email = User.generate_system_email(instance.first_name, instance.last_name)

    def __str__(self) -> str:
        return super().__str__()