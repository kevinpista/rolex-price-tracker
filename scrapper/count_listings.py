from bs4 import BeautifulSoup
import datetime
import time
import requests
import json


"""
Get initial count of potential valid listing for reference before running main scrapper parse_watch_data.py
"""


start_time = time.time()
date_today = datetime.date.today().isoformat() # YYYY-MM-DD date object format for our Watch Model
scrap_list = ['126200', '126300', '126234', '126334']
total_scrap_count = 0

for ref_num in scrap_list:
    listing_scrap_count = 0

    with open(f'{ref_num}.html') as html_file:
        soup = BeautifulSoup(html_file, 'lxml')
        # Grab each listing on search result page
        for listing in soup.find_all('div', class_='media-flex-body d-flex flex-column justify-content-between'):
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

            # Box_and_Papers will be True by default as those are the only listings we'll filter for on scrapped website
            # Seller_location will be United States by default as those are the only listings we'll filter for on scrapped website
            
            listing_title = listing.find('div', class_='text-lg text-ellipsis p-r-5 m-b-2').text.strip().lower()
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

    total_scrap_count += listing_scrap_count
    print(str(listing_scrap_count) + f' listings scrapped for reference number: {ref_num}.')
    print()

end_time = time.time()
elapsed_time = end_time - start_time

print(f"Total parsing & POST elapsed time: {int(elapsed_time // 60)} minutes, {int(elapsed_time % 60)} seconds. \nTotal scrapped count: {total_scrap_count}.")