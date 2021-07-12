from django.db import models
from django.utils import timezone

from mediaApp.models import ImageModel
# Create your models here.


class abstract_place_model(models.Model):
    id = models.AutoField(primary_key=True)
    lat = models.FloatField(null=True, blank=True)
    lon = models.FloatField(null=True, blank=True)
    placeName = models.CharField(null=True, blank=True, max_length=255)


class abstract_tag_model(models.Model):
    id = models.AutoField(primary_key=True)
    tag_name = models.CharField(unique=True, max_length=30)
    
    def __str__(self):
        return self.tag_name   
    
    class Meta:
        abstract: True
 

class abstract_content_model(models.Model):
    id = models.AutoField(primary_key=True)
    dateEdited = models.DateTimeField(auto_now=True, blank=True, null=True)
    dateCreated = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    class Meta:
        abstract: True


class abstract_post_model(abstract_content_model):
    title = models.CharField(max_length=255, default='default')
    text = models.TextField(default='default')
    image = models.ForeignKey(ImageModel, null=True, blank=True, on_delete=models.CASCADE)
    
    class Meta:
        abstract: True
    
    @classmethod
    def create_queryset_from_range(cls, from_item, to_item):
        return cls.objects.all()[from_item:from_item+to_item]


