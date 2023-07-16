from django.urls import path
from .views import WatchView, WatchSingleCreateAPI, WatchBulkCreateAPI, AveragePriceAPI, ChartDataAPI


urlpatterns =[
    path('watch/', WatchView.as_view()),
    path('watch/single-create/',WatchSingleCreateAPI.as_view()),
    path('watch/bulk-create/', WatchBulkCreateAPI.as_view()),
    path('avg-price/', AveragePriceAPI.as_view()),
    path('chart-data/', ChartDataAPI.as_view()) 
]