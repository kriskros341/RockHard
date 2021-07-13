from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse
from .serializers import NewsSerializer 
# Create your views here.
from .models import NewsModel


class Newsy(APIView):
    def get(self, request):
        quantity = int(request.query_params.get('quantity', NewsModel.objects.count()))
        offset = int(request.query_params.get('offset', 0))
        data = NewsModel.create_queryset_from_range(offset, offset+quantity)
        newsData = NewsSerializer(data, many=True)
        return JsonResponse(newsData.data, safe=False)

    def post(self, request): 
        return JsonResponse({'ho':'ha'})

    def put(self, request):
        return JsonResponse({'ho':'ha'})
    
    def delete(self, request):
        return JsonResponse({'ho':'ha'})


class SingleNews(APIView):
    def get(self, request, news_id):
        data = NewsModel.objects.get(id=news_id)
        print(data)
        theNews = NewsSerializer(data).data
        print(theNews)
        return JsonResponse(theNews)


