# Generated by Django 4.2.1 on 2023-07-30 08:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authenticate', '0005_account_profile_pic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='profile_pic',
            field=models.ImageField(default='profile.jpeg', upload_to='media/profiles/'),
        ),
    ]
