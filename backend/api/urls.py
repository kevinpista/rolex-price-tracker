from django.urls import path
from .views import WatchView





urlpatterns =[
    path('watch/', WatchView.as_view())
]