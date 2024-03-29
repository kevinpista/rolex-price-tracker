from django.db import models
from datetime import date

# Initial project is to scrap Rolex Datejust models and its 4 major reference numbers only.
# Creating general Watch model for DB in the case we want to add other watch brands later

class Watch(models.Model):
    # Django will automatically create an incrementing ID field as the primary key for our DB
    ref_num = models.CharField(max_length=50) # Model number
    brand = models.CharField(max_length=50)
    model_name = models.CharField(max_length=50) # Datejust, Daydate etc.
    bezel = models.CharField(max_length=50) # Smooth, fluted, or encrusted
    case_size = models.CharField(max_length=50) # 41 mm, 36 mm
    price = models.DecimalField(max_digits=12, decimal_places=2)
    production_year = models.IntegerField() # Data we'll scrap for now will be 2022 & 2023 only
    condition = models.CharField(max_length=50) # Data we'll scrap for now will be New, Unworn, & Very Good conditions
    box_and_papers = models.BooleanField() # Data we'll scrap for now will only be watches with Box & Papers only
    seller_location = models.CharField(max_length=100) # Data we'll scrap for now will be U.S only
    date_scrapped = models.DateField() # YYYY-MM-DD format

    """
    Scrapper will pass in ref_num of watch. The ref_num implies the watch's brand, model_name,
    bezel, and case_size. Therefore these fields can be left empty by the scrapper when it POSTS.
    
    Our serializer will make use of the below WATCH_DIRECTORY to autofill these fields for us since
    our scrapper will omit the implied fields below.
    """

    WATCH_DIRECTORY = {
        '126200': {
            'brand': 'Rolex',
            'model_name': 'Datejust',
            'bezel': 'Smooth',
            'case_size': '36 mm'
        },
        '126300': {
            'brand': 'Rolex',
            'model_name': 'Datejust',
            'bezel': 'Smooth',
            'case_size': '41 mm'
        },
        '126234': {
            'brand': 'Rolex',
            'model_name': 'Datejust',
            'bezel': 'Fluted',
            'case_size': '36 mm'
        },
        '126334': {
            'brand': 'Rolex',
            'model_name': 'Datejust',
            'bezel': 'Fluted',
            'case_size': '41 mm'
        }
    }