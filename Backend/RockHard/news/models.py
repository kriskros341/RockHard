from django.db import models, connection
from django.utils import timezone
from mediaApp.models import ImageModel
# Create your models here.

from misc.models import abstract_tag_model, abstract_post_model


class TagModel(abstract_tag_model):
    pass


class NewsModel(abstract_post_model):
    tags = models.ManyToManyField(TagModel, blank=True)
    
    def __str__(self):
        return self.title[:32]

    class Meta:
        verbose_name_plural = "Newsy"

