# Generated by Django 3.2.4 on 2021-06-26 17:37

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0007_auto_20210626_1201'),
    ]

    operations = [
        migrations.CreateModel(
            name='File',
            fields=[
                ('file_id', models.PositiveIntegerField(primary_key=True, serialize=False)),
                ('file', models.FileField(null=True, upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='ImageModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=255, null=True)),
                ('image', models.FileField(upload_to='')),
            ],
        ),
        migrations.AlterField(
            model_name='testmodel',
            name='date',
            field=models.DateField(default=datetime.datetime(2021, 6, 26, 17, 37, 18, 802268, tzinfo=utc)),
        ),
    ]