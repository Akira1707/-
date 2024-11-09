import requests
from fastapi import APIRouter, HTTPException

from backend.config import settings

weather_router = APIRouter(prefix='/weather', tags=['Weather'])
# Endpoint 1: Текущая погода для заданного города
@weather_router.get("/current/{city}")
async def get_current_weather(city: str):
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={settings.OPENWEATHER_API_KEY}&units=metric"
    response = requests.get(url)

    if response.status_code == 200:
        return response.json()
    else:
        raise HTTPException(status_code=response.status_code, detail="Error fetching current weather data")

# Endpoint 2: Прогноз погоды в городе
@weather_router.get("/forecast/{city}")
async def get_weather_forecast(city: str):
    url = f"http://api.openweathermap.org/data/2.5/forecast?q={city}&appid={settings.OPENWEATHER_API_KEY}&units=metric"
    response = requests.get(url)

    if response.status_code == 200:
        return response.json()
    else:
        raise HTTPException(status_code=response.status_code, detail="Error fetching weather forecast data")

# Endpoint 3: Загрязнение воздуха по координатам.
@weather_router.get("/air_pollution/{lat}/{lon}")
async def get_air_pollution(lat: float, lon: float):
    url = f"http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={settings.OPENWEATHER_API_KEY}"
    response = requests.get(url)

    if response.status_code == 200:
        return response.json()
    else:
        raise HTTPException(status_code=response.status_code, detail="Error fetching air pollution data")
