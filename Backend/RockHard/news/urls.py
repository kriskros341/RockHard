from .views import Newsy, SingleNews 
from django.urls import path


urlpatterns = [
    path('', Newsy.as_view()),
    path('<news_id>', SingleNews.as_view()),
    ]

