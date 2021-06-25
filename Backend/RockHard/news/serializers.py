from rest_framework import serializers


class TagSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    tag_name = serializers.CharField(max_length=30)

class NewsSerializer(serializers.Serializer):
   id = serializers.IntegerField()
   title = serializers.CharField(max_length=255)
   text = serializers.CharField(max_length=1024)
   
   tags = TagSerializer(many=True)

   




