from bs4 import BeautifulSoup
from decimal import Decimal
import datetime
import requests
import json


"""
We will be manually scrapping the HTML of the data page instead of using automation with Selenium.
I will be copy and pasting the html of the pages I need to parse to a single html file. Then use BS4 to parse data.
"""

# Will need a try and catch block where if we send post request with fields and data is not valid, rest of the parsing
# continues. Also include output line where we see how many items were added to DB

date_today = datetime.date.today().isoformat() # YYYY-MM-DD date object format for our Watch Model


scrap_list = ['126200', '126300', '126234', '126334']
for ref_num in scrap_list:

    with open(f'{ref_num}.html') as html_file:
        soup = BeautifulSoup(html_file, 'lxml')
        count = 0

        # Grab each listing on search result page
        for listing in soup.find_all('div', class_='media-flex-body d-flex flex-column justify-content-between'):

            # Find price
            price = None
            price_text = listing.find('div', class_='text-xlg text-bold').text.strip().replace('$', '').replace(',', '')
            if not price_text.isdigit(): # Check is here in case the seller puts "Price on request". Will skip this listing.
                continue
            price = price_text

            # Find production_year
            production_year = None        
            divs = listing.find_all('div', class_='row-direct')

            for div in divs:
                if 'Year of production' in div.text:
                    production_year = div.find('strong').text.strip()
                    break

            # Find condition
            condition = None
            divs = listing.find_all('div', class_='row-direct')
            for div in divs:
                if 'Condition:' in div.text:
                    condition = div.find('strong').text.strip()
                    break
                
            if price == None or production_year == None or condition == None: # If these fields were not found for the listing, skip this listing
                continue

            count += 1
            print(price, production_year, condition, date_today)

            # Box_and_Papers will be True by default as those are the only watches we'll filter
            # Location will be United States by default as those are the only watches we'll filter

        
                    
        print(count)
