from django.shortcuts import render
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse

# Create your views here.

from .models import KoncertModel
from .serializers import KoncertSerializer


class Koncerty(APIView):
    def get(self, request):
        data = KoncertModel.objects.all()
        koncertyData = KoncertSerializer(data, many=True)
        return JsonResponse(koncertyData.data, safe=False)

    def post(self, request): 
        return JsonResponse({'ho':'ha'})

    def put(self, request):
        return JsonResponse({'ho':'ha'})
    
    def delete(self, request):
        return JsonResponse({'ho':'ha'})



