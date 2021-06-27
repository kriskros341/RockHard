
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse
from .serializers import NewsSerializer, FileSerializer
# Create your views here.
from .models import TestModel
from rest_framework.parsers import MultiPartParser, FormParser

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


class SingleNews(APIView):
    def get(self, request, news_id):
        data = TestModel.objects.get(id=news_id)
        
        theNews = NewsSerializer(data).data
        return JsonResponse(theNews)

class FileView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request, *args, **kwargs):
        file_serializer = FileSerializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
