from rest_framework import serializers
from .models import Watch
from datetime import datetime

class WatchSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(default=None)
    class Meta:
        model = Watch
        fields = '__all__'

        # These fields are optional from our model as they will be autofilled by model if omitted by scrapper
        extra_kwargs = {
            'brand': {'required': False},
            'model_name': {'required': False},
            'bezel': {'required': False},
            'case_size': {'required': False}            
        }

    # If scapper enters a ref_num and omits any of the optional fields, it will check if ref_num is in our WATCH_DIRECTORY to validate if it's possible to autofill the optional fields before saving
    def validate(self, data):
        # Get the respective data fields from the input request data
        ref_num = data.get('ref_num', '')
        brand = data.get('brand', '')
        model_name = data.get('model_name', '')
        bezel = data.get('bezel', '')
        case_size = data.get('case_size', '')

        if not (brand and model_name and bezel and case_size):
            watch_details = Watch.WATCH_DIRECTORY.get(ref_num)
            if not watch_details:
                raise serializers.ValidationError('Please include all fields as this reference number is not in our watch directory.')
            data['brand'] = watch_details['brand']
            data['model_name'] = watch_details['model_name']
            data['bezel'] = watch_details['bezel']
            data['case_size'] = watch_details['case_size']

        return data
    

class AveragePriceSerializer(serializers.Serializer):
    average_price = serializers.FloatField()


class PriceSerializer(serializers.Serializer):
    date = serializers.DateField()
    price = serializers.DecimalField(max_digits=10, decimal_places=0)

    def to_representation(self, instance):
        data = super().to_representation(instance)

        # DateField is a datetime object. We filter data with datetime objects in our
        # ChartDataAPI. We need to return the date as part of the data point, thus
        # we need to convert the datetime object to a string to return as a JSONresponse.
        data['date'] = datetime.strptime(data['date'], '%Y-%m-%d').date().strftime('%Y-%m-%d')

        return data