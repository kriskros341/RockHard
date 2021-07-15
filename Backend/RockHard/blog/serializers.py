from rest_framework import serializers
from .models import BlogPostModel, BlogTagModel
from mediaApp.models import ImageModel


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogTagModel
        fields = ('id', 'tag_name',)


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageModel
        fields = ('__all__')


class BlogPostSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)
    image = ImageSerializer()
    class Meta:
        model = BlogPostModel
        fields = '__all__'
