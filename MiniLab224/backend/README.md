# Weather API Service

This is a backend service that provides weather information using the OpenWeather API. It includes endpoints for fetching current weather, weather forecasts, and air pollution data.

## 1. Run the application
Start the FastAPI server:

`uvicorn main:app --reload`

The server will be running at http://localhost:5000/.

## 2. Access the API Endpoints
You can access the following endpoints:

- Current weather for a city:

`GET /weather/current/{city}`

Example: http://localhost:5000/weather/current/Saint%20Petersburg

- Weather forecast for a city:

`GET /weather/forecast/{city}`

Example: http://localhost:5000/weather/forecast/Saint%20Petersburg

- Air pollution data by coordinates:

`GET /weather/air_pollution/{lat}/{lon}`

Example: http://localhost:5000/api/v1/weather/air_pollution/59.9343/30.3351

## 3. Postman API Documentation
You can find the Postman workspace with API documentation [here](https://api.postman.com/collections/39620949-262b8c39-8e1f-45e9-84cc-97ed749d3b43?access_key=PMAT-01JC9B1SRF2EMXVWY208A63WCA) .

## 4. Project Structure

The project is structured as follows:

- `main.py`: Contains the FastAPI application and the core routing logic to run the application.
- `config.py`: Contains configuration settings, including the OpenWeather API key and other necessary environment variables.
- `requirements.txt`: Lists the Python dependencies required for the project to run.
- `routers/`:
  - `weather.py`: Contains the route definitions for handling weather-related requests. This is where the API endpoints for fetching current weather, weather forecast, and air pollution data are defined.

## 5. Logic of the Application
This FastAPI application provides three key endpoints for fetching weather data:

1. Get Current Weather for a City:

This endpoint queries the OpenWeather API to retrieve the current weather information for a specified city. The city is passed as a URL parameter.
2. Get Weather Forecast for a City:

This endpoint retrieves a 5-day weather forecast for the specified city.
3. Get Air Pollution Data:

This endpoint retrieves air pollution data based on geographical coordinates (latitude and longitude).

The application utilizes the OpenWeather API to fetch the weather-related data and return it to the user in JSON format.
