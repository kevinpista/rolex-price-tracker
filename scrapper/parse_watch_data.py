from bs4 import BeautifulSoup
from decimal import Decimal
import datetime
import requests
import json


"""
We will be manually scrapping the HTML of the data page instead of using automation with Selenium.
I will be copy and pasting the html of the pages I need to parse to scrap.html. Then use BS4 to parse data.

Example page: https://www.chrono24.com/search/index.htm?condition=101&condition=1302&condition=1301&countryIds=US&currencyId=USD&dosearch=true&maxAgeInDays=0&pageSize=120&query=126334&redirectToSearchIndex=true&referenceNumber=126334%24221&resultview=list&searchexplain=1&sortorder=0&specials=102&year=2023&year=2022

Since there are multiple pages for a single ref_num search query on the site, pastep the html code we want to parse in one single <html> </html> tag and it will be able to parse all the data despite the .html file not being syntactically valid.
BS4 can only parse '1' <html> tag, so just manually paste each new html page inside the inner most closing </html> tag.
"""

# Will need a try and catch block where if we send post request with fields and data is not valid, rest of the parsing continues. Also include output line where we see how many items were added to DB for a certain ref_num

# Realized this implementation would end up making 1000's of individual post requests.
# Will change implementation so that each ref_num scrap sends in 1 post request that has 1 payload
# consisting of 1 list of the 1000's of different scrap data dictionaries. Will rename variable to listing_data.
# Will need to change Django backend API and serializer to accomodate for this.

date_today = datetime.date.today().isoformat() # YYYY-MM-DD date object format for our Watch Model

scrap_list = ['126200', '126300', '126234', '126334']
for ref_num in scrap_list:

    with open(f'{ref_num}') as html_file:
        soup = BeautifulSoup(html_file, 'lxml')
        count = 0

        # Grab each listing on search result page
        for listing in soup.find_all('div', class_='media-flex-body d-flex flex-column justify-content-between'):

            if count >= 1: # JUST SO WE CAN POST 1 LISTING TO START TO TEST
                break

            # Find price
            price = None
            price_text = listing.find('div', class_='text-xlg text-bold').text.strip().replace('$', '').replace(',', '')
            if not price_text.isdigit(): # Check is here in case the seller puts "Price on request" and skips the listing
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

            count += 1
            print(price, production_year, condition, date_today)

                    
            # Box_and_Papers will be True by default as those are the only watches we'll filter
            # Location will be United States by default as those are the only watches we'll filter

            if price == None or production_year == None or condition == None: # If these fields were not found for the listing, skip this listing
                continue

            scrap_data = {
            'ref_num': '126200',
            'price': price,
            'production_year': production_year,
            'condition': condition,
            'box_and_papers': True,
            'seller_location': 'United States',
            'date_scrapped': date_today        
            }

            scrap_data_json = json.dumps(scrap_data)

            endpoint_url = 'http://127.0.0.1:8000/watch/'
            headers = {'Content-Type': 'application/json'}
            response = requests.post(endpoint_url, data=scrap_data_json, headers=headers)

            if response.status_code == 200:
                print("Success")
            else:
                print("Failed")
        
                    
        print(count)