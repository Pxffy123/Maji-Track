const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";

// Nairobi coordinates
const NAIROBI = {
  latitude: -1.286389,
  longitude: 36.817223,
};

export async function getNairobiWeather() {
  try {
    const params = new URLSearchParams({
      latitude: NAIROBI.latitude,
      longitude: NAIROBI.longitude,
      current: "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m",
      timezone: "Africa/Nairobi",
    });

    const response = await fetch(`${WEATHER_API_URL}?${params}`);

    if (!response.ok) {
      throw new Error("Unable to fetch weather information.");
    }

    const data = await response.json();

    return {
      temperature: data.current.temperature_2m,
      humidity: data.current.relative_humidity_2m,
      windSpeed: data.current.wind_speed_10m,
      weatherCode: data.current.weather_code,
      updatedAt: data.current.time,
    };
  } catch (error) {
    console.error("Weather service error:", error);
    throw error;
  }
}