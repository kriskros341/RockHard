
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse
from .serializers import NewsSerializer 
# Create your views here.
from .models import TestModel


class Test(APIView):
    def get(self, request):
        quantity = int(request.query_params.get('quantity', TestModel.objects.count()))
        offset = int(request.query_params.get('offset', 0))
        data = TestModel.objects.all()[offset: offset+quantity]
        newsData = NewsSerializer(data, many=True)
        return JsonResponse(newsData.data, safe=False)

    def post(self, request): 
        print(request)
        return JsonResponse({'ho':'ha'})

    def put(self, request):
        return JsonResponse({'ho':'ha'})
    
    def delete(self, request):
        return JsonResponse({'ho':'ha'})


class SingleNews(APIView):
    def get(self, request, news_id):
        data = TestModel.objects.get(id=news_id)
        theNews = NewsSerializer(data).data
        return JsonResponse(theNews)


