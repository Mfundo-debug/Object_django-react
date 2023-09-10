from django.db import models

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

    def __str__(self) -> str:
        return super().__str__()