from rest_framework import serializers
from .models import BlogPostModel, BlogTagModel



class TagSerializer(serializers.Serializer):
    class Meta:
       model = BlogTagModel
       fields = '__all__'

class ImageSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    image = serializers.ImageField()
    description = serializers.CharField( max_length=255)
    


class BlogPostSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)
    image = ImageSerializer()
    class Meta:
        model = BlogPostModel
        fields = '__all__'
