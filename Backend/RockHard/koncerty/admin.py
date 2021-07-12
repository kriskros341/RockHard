from django.contrib import admin

# Register your models here.
from .models import KoncertModel, Place


admin.site.register(KoncertModel)
admin.site.register(Place)
