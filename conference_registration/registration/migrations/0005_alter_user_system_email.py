# Generated by Django 4.2.4 on 2023-09-11 20:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('registration', '0004_user_age_user_country_user_dob_user_gender_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='system_email',
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
    ]
