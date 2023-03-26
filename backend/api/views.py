from rest_framework.views import APIView
from .models import Watch
from .serializers import WatchSerializer, AveragePriceSerializer, PriceSerializer
from rest_framework.pagination import PageNumberPagination
from django.db.models import Avg

# For JSON Responses
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from rest_framework.exceptions import ValidationError

from datetime import datetime, timedelta, date

class WatchViewPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 100


class WatchView(APIView): # View all Watches
    def get(self, request):
        queryset = Watch.objects.all()
        paginator = WatchViewPagination()
        result_page = paginator.paginate_queryset(queryset, request)
        serializer = WatchSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)


class WatchSingleCreateAPI(APIView): # Creates 1 Watch Model object
    def post(self, request):
        data = request.data
        serializer = WatchSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response({'Message': 'Watch data added successfully'}, status=status.HTTP_200_OK)
        
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


# Takes in a payload of a list of watch listing data dictionaries to bulk create & save valid Watch Model objects
class WatchBulkCreateAPI(APIView):
    def post(self, request):
        valid_data = []
        invalid_data = []

        # Check if payload is a list of watch listing data dictionaries. Then individually validate each dictionary with serializer
        if isinstance(request.data, list):
            for data in request.data:
                serializer = WatchSerializer(data=data)
                if serializer.is_valid():
                    valid_data.append(serializer.data)
                else:
                    invalid_data.append(serializer.errors)
        else:
            return Response({'Message': 'Payload invalid. Must be a list of watch data dictionaries.'}, status=status.HTTP_400_BAD_REQUEST)

        # Creates Watch Model instances and saves them in 1 sweep to the DB
        if valid_data:
            add_count = len(valid_data)
            drop_count = len(invalid_data)

            valid_scrapped_watch_data = [Watch(**watch_data) for watch_data in valid_data] # Create Watch Model instances for each valid listing
            Watch.objects.bulk_create(valid_scrapped_watch_data) # Save all Watch Model instances
            return Response({'Message': f'{add_count} scrapped watches added successfully. {drop_count} scrapped watches were not valid and not added.'}, status=status.HTTP_200_OK)
        else:
            return Response({'Message': 'No valid watch data received. No watch data was saved.'}, status=status.HTTP_400_BAD_REQUEST)
        
    
class AveragePriceAPI(APIView): # Retrieve average market price of specific ref_num that's passed in as a query paramter
    def get(self, request):
        ref_num = request.query_params.get('ref_num')

        filtered_data = Watch.objects.filter(ref_num=ref_num)

        avg_price = round(filtered_data.aggregate(Avg('price'))['price__avg'], 2) # Aggregate function returns a dictionary

        serializer = AveragePriceSerializer({'average_price': avg_price})

        return JsonResponse(serializer.data, status=status.HTTP_200_OK)
    

    # need to have error handling here, i.e if ref_num being queried does not exist etc, or avg price data cannot be calcualted
    # will need to change so we get average price within the last month's worth of data


class ChartDataAPI(APIView):
    def get(self, request):
        interval_periods = {
            30: 3
        }
  
        ref_num = request.query_params.get('ref_num')
        interval_days = int(request.query_params.get('interval_days'))

        # we'll do the date difference calculations in this API
        
        # Get the current date in YYYY-MM-DD
        #today = datetime.now().date()

        today = datetime.now().date()

        # Calculate the start date for the last interval_days
        start_date = today - timedelta(days=interval_days)

        # Get the price data for the last interval_days
        price_data = Watch.objects.filter(ref_num=ref_num, date_scrapped__range=(start_date, today))

        # Divide the last interval_days in into respective periods for display
        interval = (timedelta(days=interval_days // interval_periods[interval_days])) # so 30 / 4
        periods = [(start_date + i*interval, start_date + (i+1)*interval) for i in range(interval_periods[interval_days])]

        # Calculate the average price for each period
        avg_prices = []
        for period in periods:
            period_price_data = price_data.filter(date_scrapped__gte=period[0], date_scrapped__lt=period[1]) # 
            avg_price = period_price_data.aggregate(Avg('price'))['price__avg']
            if avg_price == None:
                avg_price = 0

            serializer = PriceSerializer( {'date': period[0], 'price': avg_price})
            avg_prices.append(serializer.data)


        return JsonResponse(avg_prices, status=status.HTTP_200_OK, safe=False)
    
            # Print the average prices for each period
        #for i, avg_price in enumerate(avg_prices):
           # period_start_date = periods[i][0].strftime('%Y-%m-%d')
           # period_end_date = periods[i][1].strftime('%Y-%m-%d')
            # print(f"Average price for the period {period_start_date} to {period_end_date}: {avg_price}")
        
        
    
        # RETURN JSON RESPONSE OF THE PRICES IN THIS FOR LOOP. --- think it needs to be a dict assuming
        # we don't use a serializer to start

        # RN TEST IF THIS FORMAT WORKS AND HOW IT RETURNS VIA POSTMAN
        # THEN SEE HOW SERIALIZER IS IMPLMENTED AND HELPS KEEP RESPONSE AND CODE 
        # CONSISTENT