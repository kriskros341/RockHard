# Generated by Django 3.2.4 on 2021-07-01 09:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mediaApp', '0001_initial'),
        ('blog', '0002_auto_20210628_1720'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blogpostmodel',
            name='image',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='mediaApp.imagemodel'),
        ),
        migrations.DeleteModel(
            name='ImageModel',
        ),
    ]