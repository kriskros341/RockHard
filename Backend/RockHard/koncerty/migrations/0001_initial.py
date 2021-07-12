# Generated by Django 3.2.4 on 2021-07-10 09:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('misc', '0003_alter_abstract_post_model_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='Place',
            fields=[
                ('abstract_place_model_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='misc.abstract_place_model')),
                ('name', models.CharField(default='Nazwa Miejsca', max_length=255)),
            ],
            options={
                'verbose_name_plural': 'Miejsca',
            },
            bases=('misc.abstract_place_model',),
        ),
        migrations.CreateModel(
            name='KoncertModel',
            fields=[
                ('abstract_content_model_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='misc.abstract_content_model')),
                ('bandName', models.CharField(max_length=255)),
                ('tourName', models.CharField(blank=True, max_length=255, null=True)),
                ('performanceDate', models.DateTimeField(blank=True, null=True)),
                ('place', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='koncerty.place')),
            ],
            options={
                'verbose_name_plural': 'Koncerty',
            },
            bases=('misc.abstract_content_model',),
        ),
    ]
