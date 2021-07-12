from django.contrib import admin

# Register your models here.
from .models import NewsModel, ImageModel, TagModel






admin.site.site_header = "RockHard"
admin.site.site_title = "RockHard Admin"
admin.site.index_title = "Welcome to RockHard Admin"

admin.site.register(NewsModel)
admin.site.register(TagModel)

