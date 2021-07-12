from django.db import models
from django.utils import timezone
# Create your models here.
from mediaApp.models import ImageModel
from misc.models import abstract_content_model, abstract_place_model


class Place(abstract_place_model):
    name = models.CharField(max_length=255, default="Nazwa Miejsca")

    def __str__(self):
        return f"miejsce: {self.name}"

    class Meta:
        verbose_name_plural = "Miejsca"


class KoncertModel(abstract_content_model):
    bandName = models.CharField(max_length=255)
    tourName = models.CharField(max_length=255, null=True, blank=True)
    place = models.ForeignKey(Place, on_delete=models.CASCADE)
    performanceDate = models.DateTimeField(blank=True, null=True)
    


    def __str__(self):
        return f"koncert: {self.bandName}, {self.place}"

    class Meta:
        verbose_name_plural = "Koncerty"

