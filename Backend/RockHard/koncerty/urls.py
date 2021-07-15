from django.urls import path
from koncerty.views import Koncerty, SingePerformance


urlpatterns = [
    path('', Koncerty.as_view()),
    path('/<koncert_id>', SingePerformance.as_view())
    ]
