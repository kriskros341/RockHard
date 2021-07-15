from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse

# Create your views here.

from .models import KoncertModel
from .serializers import KoncertSerializer


class Koncerty(APIView):
    def get(self, request):
        data = KoncertModel.objects.all()
        koncertyData = KoncertSerializer(data, many=True)
        o = JsonResponse(koncertyData.data, safe=False)
        print(o)
        return o

    def post(self, request): 
        return JsonResponse({'ho':'ha'})

    def put(self, request):
        return JsonResponse({'ho':'ha'})
    
    def delete(self, request):
        return JsonResponse({'ho':'ha'})


class SingePerformance(APIView):
    def get(self, request, koncert_id):
        performance = get_object_or_404(KoncertModel, id=koncert_id)
        serializedPerformance = KoncertSerializer(performance).data
        return JsonResponse(serializedPerformance)

