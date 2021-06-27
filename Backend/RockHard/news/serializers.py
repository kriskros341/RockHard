from rest_framework import serializers
from .models import ImageModel
 
class TagSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    tag_name = serializers.CharField(max_length=30)


class ImageSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    image = serializers.FileField()
    description = serializers.CharField( max_length=255)
    


class NewsSerializer(serializers.Serializer):
   id = serializers.IntegerField()
   title = serializers.CharField(max_length=255)
   text = serializers.CharField(max_length=1024)
   date = serializers.DateField()   
   tags = TagSerializer(many=True)
   image = ImageSerializer()

class FileSerializer(serializers.Serializer):
    class Meta():
        model = ImageModel
        fields = ('description', 'image')




