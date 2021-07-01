from django.contrib import admin
from blog.models import BlogPostModel, BlogTagModel
# Register your models here.


from django.forms import TextInput, Textarea
from django.db import models

class MakeCharFieldsTextareas(admin.ModelAdmin):
    formfield_overrides = {
        models.CharField: {'widget': Textarea(attrs={'rows':4, 'cols':40})},
        models.TextField: {'widget': Textarea(attrs={'rows':4, 'cols':40})},
    }

admin.site.register(BlogPostModel, MakeCharFieldsTextareas)
admin.site.register(BlogTagModel)

