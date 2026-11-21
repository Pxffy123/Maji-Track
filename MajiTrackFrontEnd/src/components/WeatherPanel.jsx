import React from "react";
import { Droplets, Wind, CloudRain } from "lucide-react";

export default function WeatherPanel({ weather, loading = false, error = "" }) {
  if (loading) {
    return <div className="card weather-panel weather-state">Loading weather...</div>;
  }
  if (error) {
    return <div className="card weather-panel weather-state weather-error">{error}</div>;
  }
  if (!weather) {
    return <div className="card weather-panel weather-state">No weather data yet.</div>;
  }

  return (
    <div className="card weather-panel">
      <div className="weather-head">
        <h3>{weather.city || "Nairobi"}</h3>
      </div>
      <p className="weather-temp">{Math.round(weather.temp)}°C</p>
      <p className="weather-cond">{weather.condition}</p>

      <div className="weather-stats">
        <div className="weather-stat">
          <Droplets size={18} aria-hidden="true" />
          <strong>{weather.humidity}%</strong>
          Humidity
        </div>
        <div className="weather-stat">
          <Wind size={18} aria-hidden="true" />
          <strong>{weather.wind} km/h</strong>
          Wind
        </div>
        <div className="weather-stat">
          <CloudRain size={18} aria-hidden="true" />
          <strong>{weather.rainChance}%</strong>
          Rain
        </div>
      </div>
    </div>
  );
}