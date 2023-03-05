from rest_framework.views import APIView
from .models import Watch
from .serializers import WatchSerializer



# below is for json responses
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from rest_framework.exceptions import ValidationError



class WatchView(APIView):
    
    # For us to view the data in our GUI
    def get(self, request):

        queryset = Watch.objects.all()
        serializer = WatchSerializer(queryset, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
    # For our scrapper to input data to DB
    def post(self, request):
        data = request.data # user's request
        serializer = WatchSerializer(data=data)

        if serializer.is_valid(): # check if valid
            serializer.save() # save the data to our model db
            return Response({'message': 'Watch data added successfully'}, status=status.HTTP_200_OK)
        
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
