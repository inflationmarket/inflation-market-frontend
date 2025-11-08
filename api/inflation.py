import json
import os
from http.server import BaseHTTPRequestHandler
import requests
from datetime import datetime

# --- Environment Variables ---
FRED_API_KEY = os.environ.get("FRED_API_KEY")

# --- Helper Functions ---
def calculate_change(series_data):
    """Calculates the percentage change between the two most recent data points."""
    if len(series_data) >= 2:
        latest_value = float(series_data[0]['value'])
        previous_value = float(series_data[1]['value'])
        if previous_value != 0:
            return round(((latest_value - previous_value) / previous_value) * 100, 2)
    return 0

def format_market_data(id, name, description, sourceName, sourceUrl, releaseCadence, region, bestFor, tags, series_data):
    """Formats raw series data into the standard market data structure."""
    price = float(series_data[0]['value']) if series_data else 0
    change = calculate_change(series_data)
    
    # Reverse series for charting (most recent last) and take the last 12 points
    chart_series = [float(d['value']) for d in reversed(series_data[:12])]

    return {
        "id": id,
        "name": name,
        "description": description,
        "sourceName": sourceName,
        "sourceUrl": sourceUrl,
        "releaseCadence": releaseCadence,
        "region": region,
        "bestFor": bestFor,
        "price": price,
        "change24h": change,
        "fundingRate": 0.01,  # Mock data
        "fundingRateAPR": 3.65, # Mock data
        "volume24h": 1800000, # Mock data
        "openInterest": 7500000, # Mock data
        "tags": tags,
        "series": chart_series
    }

# --- Data Source Functions ---

def get_fred_cpi_data():
    """Fetches U.S. CPI data from Federal Reserve Economic Data (FRED)."""
    if not FRED_API_KEY:
        return None
        
    url = f"https://api.stlouisfed.org/fred/series/observations?series_id=CPIAUCSL&api_key={FRED_API_KEY}&file_type=json"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        
        series_data = [{"date": obs['date'], "value": obs['value']} for obs in reversed(data.get('observations', []))]
        
        return format_market_data(
            id="fred-cpi",
            name="FRED CPI",
            description="U.S. Consumer Price Index from the St. Louis Fed, a key inflation indicator.",
            sourceName="FRED API",
            sourceUrl="https://fred.stlouisfed.org/series/CPIAUCSL",
            releaseCadence="Monthly",
            region="US",
            bestFor="Economic analysis and research.",
            tags=["Official", "CPI", "US"],
            series_data=series_data
        )
    except (requests.exceptions.RequestException, KeyError, IndexError) as e:
        print(f"Error fetching FRED data: {e}")
        return None

# --- HTTP Handler ---

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        """Handles GET requests to the API, fetching data from FRED."""
        
        market_data = get_fred_cpi_data()
        
        if not market_data:
            self.send_error(500, "Failed to fetch data from FRED.")
            return

        # The frontend expects a list of markets, so we wrap the single market in a list
        market_data_list = [market_data]

        # Send response
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(market_data_list).encode('utf-8'))
