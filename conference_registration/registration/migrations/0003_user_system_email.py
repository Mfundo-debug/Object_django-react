# Generated by Django 4.2.4 on 2023-09-10 19:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('registration', '0002_user_student_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='system_email',
            field=models.EmailField(blank=True, max_length=254, null=True, unique=True),
        ),
    ]