from bs4 import BeautifulSoup
import datetime
import time
import requests
import json


"""
We will be manually scrapping the HTML of the data page instead of using automation with Selenium.
I will be copy and pasting the html of the pages I need to parse to its respective {ref_num}.htm file, then use BS4 to parse data.

Example page: https://www.chrono24.com/search/index.htm?condition=101&condition=1302&condition=1301&countryIds=US&currencyId=USD&dosearch=true&maxAgeInDays=0&pageSize=120&query=126334&redirectToSearchIndex=true&referenceNumber=126334%24221&resultview=list&searchexplain=1&sortorder=0&specials=102&year=2023&year=2022

Since there are multiple pages for a single ref_num search query on the site, paste the html code we want to parse in one single <html> </html> tag and it will be able to parse all the data despite the .html file not being syntactically valid.
BS4 can only parse '1' <html> tag, so just manually paste each new html page inside the inner most closing </html> tag.

Implementation sends in 1 JSON payload which is a list of scrapped watch listing data dictionaries. This way we only make
one post request to the backend and save the valid data to the database in 1 sweep
"""


start_time = time.time()
date_today = datetime.date.today().isoformat() # YYYY-MM-DD date object format for our Watch Model
scrap_list = ['126200', '126300', '126234', '126334']
total_scrap_count = 0

for ref_num in scrap_list:
    payload = []
    listing_scrap_count = 0

    with open(f'{ref_num}.html') as html_file:
        soup = BeautifulSoup(html_file, 'lxml')
        # Grab each listing on search result page
        for listing in soup.find_all('div', class_='media-flex-body d-flex flex-column justify-content-between p-y-2 p-y-sm-0'):
            # Find price
            price = None
            price_text = listing.find('div', class_='text-md text-sm-xlg text-bold').text.strip().replace('$', '').replace(',', '')
            if not price_text.isdigit(): # Check is here in case the seller puts "Price on request" and skips the listing
                continue
            price = price_text
            # Find production_year
            production_year = None        
            divs = listing.find_all('div', class_='w-50 row row-direct')
            for div in divs:
                if 'Year of production' in div.text:
                    production_year = div.find('strong').text.strip()
                    break
            # Find condition
            condition = None
            divs = listing.find_all('div', class_='w-50 row row-direct')
            for div in divs:
                if 'Condition:' in div.text:
                    condition = div.find('strong').text.strip()
                    break

            # Box_and_Papers will be True by default as those are the only listings we'll filter for on scrapped website
            # Seller_location will be United States by default as those are the only listings we'll filter for on scrapped website
            
            listing_title = listing.find('div', class_='text-sm text-sm-lg text-ellipsis p-r-5 m-b-2').text.strip().lower()
            if 'diamond' in listing_title or 'pearl' in listing_title: # Skip listings with diamond or pearl dials/bezels as prices heavily skew intended scrapped data
                continue

            if price == None or production_year == None or condition == None: # Skip listing if these fields were not found
                continue

            listing_scrap_count += 1

            scrap_data = {
            'ref_num': ref_num,
            'price': price,
            'production_year': production_year,
            'condition': condition,
            'box_and_papers': True,
            'seller_location': 'United States',
            'date_scrapped': date_today      
            }
            
            payload.append(scrap_data)

    endpoint_url = 'https://my-rolex-price-tracker-bb86e7034531.herokuapp.com/api/watch/bulk-create/'
    headers = {'Content-Type': 'application/json'}
    response = requests.post(endpoint_url, data=json.dumps(payload), headers=headers)
    message = response.json()['Message']
    total_scrap_count += listing_scrap_count
    print(str(listing_scrap_count) + f' listings scrapped for reference number: {ref_num}.')
    print(f'For reference number {ref_num}: ' + message)
    print()

end_time = time.time()
elapsed_time = end_time - start_time
print(f"Total parsing & POST elapsed time: {int(elapsed_time // 60)} minutes, {int(elapsed_time % 60)} seconds. \nTotal scrapped count: {total_scrap_count}.")