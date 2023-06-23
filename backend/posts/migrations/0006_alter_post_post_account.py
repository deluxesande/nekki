# Generated by Django 4.2.1 on 2023-06-17 19:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authenticate', '0002_remove_account_password'),
        ('posts', '0005_alter_post_post_account'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='post_account',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='authenticate.account'),
        ),
    ]
