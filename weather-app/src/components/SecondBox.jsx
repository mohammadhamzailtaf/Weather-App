import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SecondBox.css';

function SecondBox({ updateWeatherData }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [cityData, setCityData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Function to get the user's city from IPinfo API
    const getCityFromIP = async () => {
      const apiKey = '31269f8eb6044f'; // Your IPinfo API key
      try {
        const response = await axios.get(`https://ipinfo.io/json?token=${apiKey}`);
        const city = response.data.city;
        fetchWeather(city);
      } catch (error) {
        console.error('Error fetching location from IP:', error);
        setError('Failed to get location from IP.');
      }
    };

    getCityFromIP();
  }, []);

  const fetchWeather = async (city) => {
    const apiKey = '24aa5cb46a1dfc073fb0bac9f6a80f03'; // Your actual OpenWeatherMap API key

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      const data = response.data;
      const weatherData = {
        date: new Date().toLocaleDateString(),
        day: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
        temperature: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        weatherType: data.weather[0].main,
        city: data.name
      };
      setCityData(weatherData);
      updateWeatherData(weatherData);
      setError('');
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch weather data. Please check your API key and try again.');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(searchQuery);
  };

  return (
    <div className="second-box">
      <form onSubmit={handleSearch}>
        <div className="search-container">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Location"
          />
          <button type="submit">Search</button>
        </div>
      </form>
      {error && <div className="error">{error}</div>}
      {cityData && (
        <div className="city-info">
          <div className="city-name">
            <span className="label">NAME:</span>
            <span className="value">{cityData.city}</span>
          </div>
          <div className="temperature">
            <span className="label">TEMP:</span>
            <span className="value">{cityData.temperature}°C</span>
          </div>
          <div className="humidity">
            <span className="label">HUMIDITY:</span>
            <span className="value">{cityData.humidity}%</span>
          </div>
          <div className="wind-speed">
            <span className="label">WIND SPEED:</span>
            <span className="value">{cityData.windSpeed} m/s</span>
          </div>
          <div className="weather-type">
            <span className="label">WEATHER:</span>
            <span className="value">{cityData.weatherType}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default SecondBox;
