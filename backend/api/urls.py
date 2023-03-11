from django.urls import path
from .views import WatchView, WatchSingleCreateAPI, WatchBulkCreateAPI





urlpatterns =[
    path('watch/', WatchView.as_view()),
    path('watch/single-create/',WatchSingleCreateAPI.as_view()),
    path('watch/bulk-create/', WatchBulkCreateAPI.as_view())
]