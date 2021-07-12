from django.urls import path
from koncerty.views import Koncerty


urlpatterns = [
    path('', Koncerty.as_view())
]
