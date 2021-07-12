from rest_framework import serializers
from .models import Place, KoncertModel
from mediaApp.serializers import ImageSerializer


class PlaceSerializer(serializers.Serializer):
    
    id = serializers.IntegerField()
    lat = serializers.FloatField()
    lon = serializers.FloatField()
    placeName = serializers.CharField()

class KoncertSerializer(serializers.ModelSerializer):
    place = PlaceSerializer()
    image = ImageSerializer(required=False)

    class Meta:
        model = KoncertModel
        fields = '__all__'
