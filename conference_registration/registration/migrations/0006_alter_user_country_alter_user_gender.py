# Generated by Django 4.2.4 on 2023-09-11 22:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('registration', '0005_alter_user_system_email'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='country',
            field=models.CharField(choices=[('South Africa', 'South Africa'), ('USA', 'USA'), ('UK', 'UK'), ('Canada', 'Canada'), ('Australia', 'Australia'), ('Botswana', 'Botswana'), ('Zimbabwe', 'Zimbabwe'), ('Germany', 'Germany'), ('France', 'France'), ('Japan', 'Japan'), ('Nigeria', 'Nigeria'), ('Kenya', 'Kenya'), ('Ghana', 'Ghana'), ('Congo', 'Congo'), ('Egypt', 'Egypt'), ('Ethiopia', 'Ethiopia'), ('Morocco', 'Morocco'), ('India', 'India'), ('Russia', 'Russia'), ('Brazil', 'Brazil'), ('Mexico', 'Mexico'), ('Argentina', 'Argentina'), ('Other', 'Other')], max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='gender',
            field=models.CharField(choices=[('Male', 'Male'), ('Female', 'Female')], max_length=10, null=True),
        ),
    ]
