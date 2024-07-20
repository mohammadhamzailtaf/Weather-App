import React from 'react';
import WeatherAnimation from './WeatherAnimation';
import './FirstBox.css';

function FirstBox({ weatherData }) {
  const { date = '', day = '', temperature = '---', weatherType = '' } = weatherData || {};

  return (
    <div className="first-box">
      <div className="day">{day}</div>
      <div className="date">{date}</div>
      <WeatherAnimation weatherType={weatherType} />
      <div className="temperature">{temperature}°C</div>
    </div>
  );
}

export default FirstBox;
