from django.db import models

# Create your models here.



class ImageModel(models.Model):
    id = models.AutoField(primary_key=True)
    description = models.CharField(null=True, blank=True, max_length=255)
    image = models.ImageField()
    alias = models.CharField(null=True, blank=True, unique=True, max_length=64)
    
    def __str__(self):
        return self.alias or self.image.name
    
    class Meta:
        verbose_name_plural = "Images"

