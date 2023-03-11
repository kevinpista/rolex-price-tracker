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


class WatchBulkCreateAPI(APIView): # Takes in a payload of a list of watch data dictionaries and creates and saves multiple valid watch objects
    def post(self, request):
        data = request.data # Should be a list of dictionaries containing a watch listing's data

        if isinstance(data, list):
            receive_count = len(data)
            add_count = 0
            watch_data = []

            for scrapped_watch in request.data:
                watch_serializer = WatchSerializer(data=scrapped_watch)

                if watch_serializer.is_valid(): # Check if the individual scrapped watch data is valid
                    validated_data = watch_serializer.validated_data # Deserialize it, this is still a dictionary of watch data for 1 watch object
                    # Don't need to call watch_serializer.save() as we add and save all watches in bulk at the end
                    watch_data.append(validated_data) # Append watch validated data to a list of validated watch data objects
                    add_count += 1

            drop_count = receive_count - add_count
            Watch.objects.bulk_create(watch_data) # Create a watch object for each valid scrapped watch listing and save to DB

            return Response({'message': f'{add_count} scrapped watches added successfully. {drop_count} scrapped watches were not valid and not added'}, status=status.HTTP_200_OK)
        
        else:
            return Response({'message': 'Payload invalid'}, status=status.HTTP_400_BAD_REQUEST)
            



# aight this shits fucked. gotta write a 2nd serializer that serializes the bulk payload
# and validate each watch data inside. but continue with code if watch data inside is not valid

