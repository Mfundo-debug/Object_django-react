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


    def generate_system_email(instance):
        first_name = instance.first_name.split()[0]
        last_name = instance.last_name
        initials = first_name[0]
        system_email = f"{last_name}{initials}@SmartSystem.com"
        count = User.objects.filter(system_email=system_email).count()
        if count > 0:
            system_email = f"{system_email}{count+1:02d}"
        return system_email
    
    @receiver(pre_save, sender='registration.User')
    def generate_and_assign_system_email(sender, instance, *args, **kwargs):
        if not instance.system_email:
            instance.system_email = User.generate_system_email(instance)

    def __str__(self) -> str:
        return super().__str__()