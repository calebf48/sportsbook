import os
import requests
from dotenv import load_dotenv
import json

load_dotenv()

api_key = os.getenv('API_KEY')
markets = 'spreads'
url = 'https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds?apiKey='+api_key+'&regions=us&oddsFormat=american&markets='+markets

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



