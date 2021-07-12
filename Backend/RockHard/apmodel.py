from django.db import models

# abstract post model

class abstract_post_model(models.Model):
    id = models.AutoField(primary_key=True)
    dateEdited = models.DateTimeField(auto_now=True)
    dateCreated = models.DateTimeField(auto_now_add=True)

