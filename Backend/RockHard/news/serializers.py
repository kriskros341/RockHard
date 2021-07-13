from rest_framework import serializers
from .models import ImageModel, NewsModel, TagModel
from mediaApp.serializers import ImageSerializer
 
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = TagModel
        fields = ('id', 'tag_name', )

class NewsSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)
    image = ImageSerializer()

    class Meta:
        model = NewsModel
        fields = ('id', 'tags', 'text', 'image', 'title')




