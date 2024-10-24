import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCloudSun, FaCloudRain, FaSun, FaCloud, FaWind } from 'react-icons/fa';
import '../App.css';

const apiKey = 'd2aea1a4d7f5fcdc7ad'; // Replace with your OpenWeatherMap API key
const apiBase = 'https://api.openweathermap.org/data/2.5/';

function Weather() {
  const [city, setCity] = useState('Chennai'); // Default city
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');

  const getWeatherIcon = (condition) => {
    if (condition.includes('cloud')) return <FaCloud />;
    if (condition.includes('rain')) return <FaCloudRain />;
    if (condition.includes('sun')) return <FaSun />;
    if (condition.includes('wind')) return <FaWind />;
    return <FaCloudSun />;
  };

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`${apiBase}weather?q=${city}&units=metric&appid=${apiKey}`);
      const forecastResponse = await axios.get(`${apiBase}forecast?q=${city}&units=metric&appid=${apiKey}`);
      setWeather(response.data);
      setForecast(forecastResponse.data);
      setError('');
    } catch (err) {
      setError('City not found.');
      setWeather(null);
      setForecast(null);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);

  const handleSearch = () => {
    fetchWeather();
  };

  const formatTime = (unixTime) => {
    const date = new Date(unixTime * 1000);
    return date.toLocaleTimeString();
  };

  return (
    <div className="app">
      <div className="weather-container">
        <h1>Weather App</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {weather && (
          <div className="weather-info">
            <div className="weather-icon">{getWeatherIcon(weather.weather[0].description)}</div>
            <h2>{weather.name}</h2>
            <p>{weather.weather[0].description}</p>
            <p>{weather.main.temp}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind: {weather.wind.speed} m/s</p>
            <p>Local Time: {formatTime(weather.dt)}</p>
          </div>
        )}

        {forecast && (
          <div className="forecast">
            <h3>3-Day Forecast</h3>
            <div className="forecast-days">
              {forecast.list.slice(0, 24).map((day, idx) => (
                <div key={idx} className="forecast-day">
                  <p>{formatTime(day.dt)}</p>
                  <div className="forecast-icon">
                    {getWeatherIcon(day.weather[0].description)}
                  </div>
                  <p>{day.main.temp}°C</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default Weather;
