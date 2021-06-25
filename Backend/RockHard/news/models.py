from django.db import models, connection

# Create your models here.

def sequence_id(sequence):
  with connection.cursor() as cursor:
    cursor.execute("SELECT nextval('{}')".format(sequence))
    return cursor.fetchone()[0]

def test_model_sequence_id():
    return sequence_id('testmodel_id_seq')

def tagmodel_sequence_id():
    return sequence_id('news_testmodel_tags_id_seq')


class TagModel(models.Model):
    id = models.PositiveIntegerField(primary_key=True, unique=True, default=tagmodel_sequence_id)
    tag_name = models.CharField(unique=True, max_length=30)
    def __str__(self):
        return self.tag_name


class TestModel(models.Model):
    id = models.PositiveIntegerField(primary_key=True, unique=True, default=test_model_sequence_id)
    title = models.CharField(max_length=255)
    text = models.CharField(default='default', max_length=1024)
    tags = models.ManyToManyField(TagModel, default=None, null=True)

    def __str__(self):
        return self.title
