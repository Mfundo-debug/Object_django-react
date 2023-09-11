from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.utils import timezone

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
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email_address = models.EmailField(max_length=254)
    residential_address = models.CharField(max_length=100)
    student_identity_number = models.CharField(max_length=10, unique=True)
    system_email = models.EmailField(max_length=254, unique=True, blank=True, null=True)
    dob = models.DateField(default=timezone.now)
    gender = models.CharField(max_length=10, null=True)
    country = models.CharField(max_length=30, null=True)
    nationality = models.CharField(max_length=30, null=True)
    age = models.IntegerField(null=True)


    def generate_system_email(first_name, last_name):
        if " " in first_name:
            first_name_initial = "".join([name[0] for name in first_name.split()])
        else:
            first_name_initial = first_name[0]
        email_prefix = f"{last_name}{first_name_initial}"
        existing_emails = User.objects.filter(system_email__startswith=email_prefix).values_list("system_email", flat=True)
        email_numbers = [int(email.split("@")[0][-2:]) for email in existing_emails if email.split("@")[0][-2:].isdigit()]
        if not email_numbers:
            return f"{email_prefix}@SmartSystem.com"
        else:
            next_number = max(email_numbers) + 1
            while True:
                system_email = f"{email_prefix}{next_number:02}@SmartSystem.com"
                if not User.objects.filter(system_email=system_email).exists():
                    return system_email
                next_number += 1
    
    @receiver(pre_save, sender='registration.User')
    def generate_and_assign_system_email(sender, instance, *args, **kwargs):
        if not instance.system_email:
            instance.system_email = User.generate_system_email(instance.first_name, instance.last_name)

    def __str__(self) -> str:
        return super().__str__()