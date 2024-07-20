import React, { useState } from 'react';
import FirstBox from './components/FirstBox';
import SecondBox from './components/SecondBox';
import './index.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);

  const updateWeatherData = (data) => {
    setWeatherData(data);
  };

  return (
    <div className="app-container">
      <FirstBox weatherData={weatherData} />
      <SecondBox updateWeatherData={updateWeatherData} />
    </div>
  );
}

export default App;
