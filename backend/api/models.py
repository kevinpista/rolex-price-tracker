from django.db import models
from datetime import date

# Initial project is to scrap Rolex and its 4 ref numbers only
# Creating general Watches model for DB in the case we want to add other watch brands later

class Watch(models.Model):
    # django will automatically create an autoincrementing ID field as the primary key for our DB
    ref_num = models.CharField(max_length=50)
    brand = models.CharField(max_length=50)
    model_name = models.CharField(max_length=50) # Datejust, Daydate etc.
    bezel = models.CharField(max_length=50) # Smooth, fluted, or encrusted
    case_size = models.CharField(max_length=50) # 41 mm, 36 mm
    price = models.DecimalField(max_digits=12, decimal_places=2)
    production_year = models.IntegerField() # Data we'll scrap for now will be 2022 & 2023 only
    condition = models.CharField(max_length=50)
    box_and_papers = models.BooleanField() # Data we'll scrap for now will only be watches with Box & Papers only
    seller_location = models.CharField(max_length=100) # Data we'll scrap for no will be U.S only
    date_scrapped = models.DateField() # YYYY-MM-DD format

    """
    Scrapper will pass in ref_num of watch. The ref_num implies the watch's brand, model_name,
    bezel, and case_size. Therefore these fields can be left empty by the scrapper when written to.
    Method below will override the method of the model class when those fields are empty.
    
    Our serializer will make use of this WATCH_DIRECTORY to autofill these fields for us if our scrapper
    ommits the brand, model_name, bezel, or case_size in its input.



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

"""

Code below was initially implemented to validate the optional fields and autofill it forus, but this check will be handled by our serializer as we do not want to save the data if
the scrapper omits a field and the ref_num is not in the WATCH_DIRECTORY

    def __init__(self, *args, **kwargs): 
        super(Watch, self).__init__(*args, **kwargs)

        if self.ref_num:
            watch_details = Watch.WATCH_DIRECTORY.get(self.ref_num) # Fetch inner dict of watch inside directory

            if not self.brand:
                self.brand = watch_details['brand'] if watch_details else ''
            if not self.model_name:
                self.model_name = watch_details['model_name'] if watch_details else ''
            if not self.bezel:
                self.bezel = watch_details['bezel'] if watch_details else ''
            if not self.case_size:
                self.case_size = watch_details['case_size'] if watch_details else ''
"""