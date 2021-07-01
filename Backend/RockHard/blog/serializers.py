from rest_framework import serializers

class TagSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    tag_name = serializers.CharField(max_length=30)


class ImageSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    image = serializers.ImageField()
    description = serializers.CharField( max_length=255)
    


class BlogPostSerializer(serializers.Serializer):
   id = serializers.IntegerField()
   title = serializers.CharField(max_length=255)
   text = serializers.CharField(max_length=1024)
   date = serializers.DateTimeField()   
   tags = TagSerializer(many=True)
   image = ImageSerializer()
