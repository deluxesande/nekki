# Generated by Django 4.2.1 on 2023-06-15 07:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authenticate', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='account',
            name='password',
        ),
    ]
