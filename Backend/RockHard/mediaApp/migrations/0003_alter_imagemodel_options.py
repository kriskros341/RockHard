# Generated by Django 3.2.4 on 2021-07-10 09:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mediaApp', '0002_imagemodel_alias'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='imagemodel',
            options={'verbose_name_plural': 'Images'},
        ),
    ]