import { useState } from "react";
import "./WeatherDashboard.css";

function WeatherDashboard() {
  const [citySearch, setCitySearch] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchWeather = async (e) => {
    e.preventDefault();
    if (!citySearch.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=a7681abb726cdfefa4040bb9f108276e&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather({
        temp: Math.round(data.main.temp),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        city: data.name,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        feelsLike: Math.round(data.main.feels_like),
        pressure: data.main.pressure,
      });
    } catch (err) {
      setError("City not found");
    } finally {
      setLoading(false);
    }
  };

  const clearWeather = () => {
    setWeather(null);
    setCitySearch("");
    setError(null);
  };

  return (
    <div className="weather-dashboard">
      <div className="weather-search-container">
        <h2>Weather Dashboard</h2>
        <form onSubmit={searchWeather} className="weather-search-form">
          <input
            type="text"
            placeholder="Enter city name to check weather..."
            value={citySearch}
            onChange={(e) => setCitySearch(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Check Weather"}
          </button>
        </form>
      </div>

      {error && <div className="weather-error">{error}</div>}

      {weather && (
        <div className="weather-result">
          <div className="weather-header">
            <div className="weather-main">
              <img
                src={`http://openweathermap.org/img/w/${weather.icon}.png`}
                alt={weather.description}
                className="weather-icon"
              />
              <div className="weather-primary-info">
                <h3>{weather.city}</h3>
                <div className="temperature">{weather.temp}°C</div>
                <div className="description">{weather.description}</div>
              </div>
            </div>
            <button onClick={clearWeather} className="close-weather" title="Close weather">
              ✕
            </button>
          </div>

          <div className="weather-details-grid">
            <div className="weather-detail-item">
              <span className="detail-label">Feels Like</span>
              <span className="detail-value">{weather.feelsLike}°C</span>
            </div>
            <div className="weather-detail-item">
              <span className="detail-label">Humidity</span>
              <span className="detail-value">{weather.humidity}%</span>
            </div>
            <div className="weather-detail-item">
              <span className="detail-label">Wind Speed</span>
              <span className="detail-value">{weather.windSpeed} m/s</span>
            </div>
            <div className="weather-detail-item">
              <span className="detail-label">Pressure</span>
              <span className="detail-value">{weather.pressure} hPa</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherDashboard;
