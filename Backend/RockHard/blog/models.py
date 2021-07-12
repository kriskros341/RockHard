from django.db import models
# Create your models here.
from misc.models import abstract_tag_model, abstract_post_model


class BlogTagModel(abstract_tag_model):
    class Meta:
        verbose_name_plural = "Tagi"




class BlogPostModel(abstract_post_model):
    tags = models.ManyToManyField(BlogTagModel)
    
    def __str__(self):
        return self.title[:32]
    
    def textConcatinated(self):
        return f"{self.text[:32]}..."

    class Meta:
        verbose_name_plural = "Posty"


