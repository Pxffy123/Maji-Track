const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";

// Nairobi coordinates
const NAIROBI = {
  latitude: -1.286389,
  longitude: 36.817223,
};

// WMO weather codes -> readable text
function describeWeather(code) {
  if (code === 0) return "Clear sky";
  if (code <= 2) return "Partly cloudy";
  if (code === 3) return "Overcast";
  if (code === 45 || code === 48) return "Foggy";
  if (code >= 51 && code <= 57) return "Drizzle";
  if (code >= 61 && code <= 67) return "Rain";
  if (code >= 80 && code <= 82) return "Rain showers";
  if (code >= 95) return "Thunderstorm";
  return "Cloudy";
}

// Returns the shape WeatherPanel expects:
// { city, temp, humidity, wind, rainChance, condition, updatedAt }
export async function getNairobiWeather() {
  const params = new URLSearchParams({
    latitude: NAIROBI.latitude,
    longitude: NAIROBI.longitude,
    current: "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m",
    daily: "precipitation_probability_max",
    forecast_days: "1",
    timezone: "Africa/Nairobi",
  });

  const response = await fetch(`${WEATHER_API_URL}?${params}`);

  if (!response.ok) {
    throw new Error("Unable to fetch weather information.");
  }

  const data = await response.json();

  return {
    city: "Nairobi",
    temp: data.current.temperature_2m,
    humidity: data.current.relative_humidity_2m,
    wind: Math.round(data.current.wind_speed_10m),
    rainChance: data.daily?.precipitation_probability_max?.[0] ?? 0,
    condition: describeWeather(data.current.weather_code),
    updatedAt: data.current.time,
  };
}
