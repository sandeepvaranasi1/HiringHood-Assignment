import { useState } from 'react';
import { getWeather } from '../services/api';
import './Weather.css';

function Weather({ address }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Extract city from address
      const city = address.split(',')[1]?.trim() || address.split(',')[0]?.trim();
      
      const response = await getWeather(city);
      setWeather({
        temp: Math.round(response.data.main.temp),
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        city: response.data.name
      });
    } catch (err) {
      setError('Could not fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="weather-loading">Loading weather...</div>;
  }

  if (error) {
    return <div className="weather-error">{error}</div>;
  }

  return (
    <div className="weather-container">
      {!weather ? (
        <button onClick={fetchWeather} className="weather-button">
          🌤️ Check Weather
        </button>
      ) : (
        <div className="weather-info">
          <img
            src={`http://openweathermap.org/img/w/${weather.icon}.png`}
            alt={weather.description}
            className="weather-icon"
          />
          <div className="weather-details">
            <div className="weather-temp">{weather.temp}°C</div>
            <div className="weather-desc">{weather.description}</div>
            <div className="weather-city">{weather.city}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;