
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse
from .serializers import NewsSerializer
# Create your views here.
from .models import TestModel
class Test(APIView):
    def get(self, request):
        toReturn = []
        quantity = int(request.query_params.get('quantity', TestModel.objects.count()))
        offset = int(request.query_params.get('offset', 0))
        data = TestModel.objects.all()[offset: offset+quantity]
        theNews = NewsSerializer(data, many=True)
        toReturn.append(theNews.data)
        return JsonResponse({'data':toReturn})


    def post(self, request): 
        return JsonResponse({'ho':'ha'})

    def put(self, request):
        return JsonResponse({'ho':'ha'})
    
    def delete(self, request):
        return JsonResponse({'ho':'ha'})
