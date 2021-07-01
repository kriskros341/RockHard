from rest_framework import serializers
from .models import ImageModel
from mediaApp.serializers import ImageSerializer
 
class TagSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    tag_name = serializers.CharField(max_length=30)


class NewsSerializer(serializers.Serializer):
   id = serializers.IntegerField()
   title = serializers.CharField(max_length=255)
   text = serializers.CharField(max_length=1024)
   date = serializers.DateTimeField()   
   tags = TagSerializer(many=True)
   image = ImageSerializer()





