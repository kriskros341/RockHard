from django.db import models
from django.utils import timezone
# Create your models here.
from mediaApp.models import ImageModel


class BlogTagModel(models.Model):
    id = models.AutoField(primary_key=True)
    tag_name = models.CharField(unique=True, max_length=30)
    def __str__(self):
        return self.tag_name   


class BlogPostModel(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255, default='default')
    text = models.TextField(default='default')
    tags = models.ManyToManyField(BlogTagModel, null=True, blank=True)
    image = models.ForeignKey(ImageModel, null=True, blank=True, on_delete=models.PROTECT)
    date = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.title[:32]

