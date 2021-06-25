# Generated by Django 3.2.4 on 2021-06-24 18:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0004_taglistmodel'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tagmodel',
            name='tag_name',
            field=models.CharField(max_length=30, unique=True),
        ),
        migrations.AlterField(
            model_name='testmodel',
            name='tags',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='news.taglistmodel'),
        ),
    ]
