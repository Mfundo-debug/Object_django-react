# Generated by Django 4.2.4 on 2023-09-10 12:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('registration', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='student_status',
            field=models.CharField(choices=[('New Student', 'New Student'), ('Returning Student', 'Returning Student')], default='New Student', max_length=20),
        ),
    ]
