import datetime
import requests
import json

date_today = datetime.date.today().isoformat() # YYYY-MM-DD date object format for our Watch Model

#scrap_ref_nums = ['126200', '126300', '126234', '126334']

"""
Test sending in a payload manually to test backend. 
Send in 2 watch objects only.
"""

scrap_data_list = []


scrap_data1 = {
'ref_num': '126334',
'price': 10000,
'production_year': 2022,
'condition': 'New',
'box_and_papers': True,
'seller_location': 'United States',
'date_scrapped': f'{date_today}'        
}

scrap_data2 = {
'ref_num': '126234',
'price': 12000,
'production_year': 2023,
'condition': 'New',
'box_and_papers': True,
'seller_location': 'United States',
'date_scrapped': '2023-03-06'       
}
scrap_data_list.append(scrap_data1)
scrap_data_list.append(scrap_data2)


endpoint_url = 'http://127.0.0.1:8000/watch/bulk-create/'
headers = {'Content-Type': 'application/json'}
response = requests.post(endpoint_url, data=json.dumps(scrap_data_list), headers=headers)
message = response.json()['Message']

if response.status_code == 200:
    print(message)
else:
    print(message)