# Generated by Django 4.2.1 on 2023-07-28 18:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0007_alter_post_created'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='when_posted',
            field=models.DateField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='created',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]