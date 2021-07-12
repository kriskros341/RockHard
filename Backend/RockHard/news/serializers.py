from rest_framework import serializers
from .models import ImageModel, NewsModel, TagModel
from mediaApp.serializers import ImageSerializer
 
class TagSerializer(serializers.Serializer):
    class Meta:
        model = TagModel
        fields = '__all__'


class NewsSerializer(serializers.Serializer):
    class Meta:
        model = NewsModel
        fields = '__all__'





