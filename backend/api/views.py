from rest_framework.views import APIView
from .models import Watch
from .serializers import WatchSerializer, AveragePriceSerializer
from rest_framework.pagination import PageNumberPagination
from django.db.models import Avg

# For JSON Responses
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from rest_framework.exceptions import ValidationError

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

        avg_price = filtered_data.aggregate(Avg('price'))['price__avg'] # Aggregate function returns a dictionary

        serializer = AveragePriceSerializer({'average_price': avg_price})

        return JsonResponse(serializer.data, status=status.HTTP_200_OK)
    

    # need to have error handling here, i.e if ref_num being queried does not exist etc, or avg price data cannot be calcualted
    # will need to change so we get average price within the last month's worth of data