from django.urls import path
from blog.views import Blog, SingeBlogPost


urlpatterns = [
    path('/', Blog.as_view()), 
    path('/<post_id>', SingeBlogPost.as_view()),
]
