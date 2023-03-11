from rest_framework.views import APIView
from .models import Watch
from .serializers import WatchSerializer

# below is for json responses
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from rest_framework.exceptions import ValidationError


class WatchView(APIView): # View All Watches
    def get(self, request):
        queryset = Watch.objects.all()
        serializer = WatchSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class WatchSingleCreateAPI(APIView): # Create 1 single watch
    def post(self, request):
        data = request.data
        serializer = WatchSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Watch data added successfully'}, status=status.HTTP_200_OK)
        
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


# Takes in a payload of a list of watch data dictionaries to create and save multiple valid watch objects in 1 sweep
class WatchBulkCreateAPI(APIView):
    def post(self, request):
        valid_data = []
        invalid_data = []

        # Check if user input is a valid list of watch data dictionaries. Then individully verify each dictionary with serializer
        if isinstance(request.data, list):
            for data in request.data:
                serializer = WatchSerializer(data=data) # Validated each dictionary of scrapped watch data

                if serializer.is_valid():
                    valid_data.append(serializer.data)

                else:
                    invalid_data.append(serializer.errors)

        else:
            return Response({'message': 'Payload invalid. Must be a list of watch data dictionaries.'}, status=status.HTTP_400_BAD_REQUEST)
            

        if valid_data:
            add_count = len(valid_data)
            drop_count = len(invalid_data)

            valid_scrapped_watch_data = [Watch(**watch_data) for watch_data in valid_data] # Create Watch Model instances for each valid listing
            Watch.objects.bulk_create(valid_scrapped_watch_data) # Save all Watch Model instances
            return Response({'message': f'{add_count} scrapped watches added successfully. {drop_count} scrapped watches were not valid and not added'}, status=status.HTTP_200_OK)
        
        else:
            return Response({'message': 'No valid watch data receivd. No watch data was saved.'}, status=status.HTTP_400_BAD_REQUEST)