from django.shortcuts import render
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse
# Create your views here.
from .models import BlogPostModel
from .serializers import BlogPostSerializer


class Blog(APIView):
    def get(self, request):
        quantity = int(request.query_params.get('quantity', BlogPostModel.objects.count()))
        offset = int(request.query_params.get('offset', 0))
        posts = BlogPostModel.objects.all()[offset: offset+quantity]
        postsData = BlogPostSerializer(posts, many=True)
        return JsonResponse(postsData.data, safe=False)
    
    def post(self, request):
        return JsonResponse({'To':'dziala'})


class SingeBlogPost(APIView):
    def get(self, request, post_id):
        post = BlogPostModel.objects.get(id=post_id)
        serializedPost = BlogPostSerializer(post).data
        return JsonResponse(serializedPost)
