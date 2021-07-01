from django.contrib import admin

# Register your models here.

from .models import TestModel, ImageModel, TagModel
admin.site.register(TestModel)
admin.site.register(TagModel)














