import React from 'react';

function WeatherAnimation({ weatherType }) {
  const animationMap = {
    'Clear': '☀️',   // Clear
    'Rain': '🌧️',   // Rain
    'Clouds': '☁️',   // Clouds
    'Snow': '❄️'    // Snow
  };

  return (
    <div className="weather-animation">
      <span className="weather-icon">{animationMap[weatherType] || '⛅'}</span>
    </div>
  );
}

export default WeatherAnimation;
