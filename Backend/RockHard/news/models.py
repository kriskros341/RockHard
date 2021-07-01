from django.db import models, connection
from django.utils import timezone
from mediaApp.models import ImageModel
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
    id = models.BigAutoField(primary_key=True)
    tag_name = models.CharField(unique=True, max_length=30)
    def __str__(self):
        return self.tag_name


class TestModel(models.Model):
    id = models.BigAutoField(primary_key=True) 
    title = models.TextField(max_length=255)
    text = models.TextField(default='default', max_length=1024)
    tags = models.ManyToManyField(TagModel, blank=True)
    date = models.DateTimeField(default=timezone.now)
    image = models.ForeignKey(ImageModel, null=True, blank=True, on_delete=models.PROTECT)

    def __str__(self):
        return self.title[:32]


