import os
import requests
from dotenv import load_dotenv
import json

load_dotenv()

api_key = os.getenv('API_KEY')
markets = ['h2h', 'spreads']

# Track success of each request individually
all_data_saved = True

for market in markets:
    # Update the URL by replacing the market part dynamically
    url = f'https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds?apiKey={api_key}&regions=us&oddsFormat=american&markets={market}'
    
    r = requests.get(url)
    if r.status_code == 200:
        json_data = r.json()

        # Save the data based on the current market
        if market == 'h2h':
            with open('src/data/response_h2h.json', 'w') as file:
                json.dump(json_data, file, indent=4)
            print('H2H data saved successfully\n')
        
        elif market == 'spreads':
            with open('src/data/response_spread.json', 'w') as file:
                json.dump(json_data, file, indent=4)
            print('Spread data saved successfully\n')
        
        # Save response headers (this happens for each market)
        with open('src/data/response_headers.txt', 'w') as file:
            file.write('Response Headers:\n')
            for key, value in r.headers.items():
                file.write(f'{key}: {value}\n')
    else:
        # If any request fails, set the flag to False and break out of the loop
        all_data_saved = False
        print(f'Failed to retrieve data for market {market}. Status code: {r.status_code}')
        break  # Stop processing if any market request fails

# Print "All data saved successfully" only if all requests were successful
if all_data_saved:
    print('All data saved successfully')



'''
r = requests.get(url)

if r.status_code == 200:
    json_data = r.json()
    if markets == 'h2h':
        with open('src/data/response_h2h.json', 'w') as file:
            #Convert JSON object to a formatted string and write to the file
            json.dump(json_data, file, indent=4)
    elif markets == 'spreads':
        with open('src/data/response_spread.json', 'w') as file:
            #Convert JSON object to a formatted string and write to the file
            json.dump(json_data, file, indent=4)

    with open('src/data/response_headers.txt', 'w') as file:
        file.write("Response Headers:\n")
        for key, value in r.headers.items():
            file.write(f"{key}: {value}\n")

    print("Data saved successfully")
else:
    print(f"Failed to retrieve data. Status code: {r.status_code}")
'''


