
from rest_framework import serializers


class ImageSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    image = serializers.ImageField()
    description = serializers.CharField( max_length=255)
