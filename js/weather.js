const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast?latitude=47.3546&longitude=8.5750&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=Europe/Zurich';

const WEATHER_DESC = {
  0: 'Clear',
  1: 'Mostly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Fog',
  51: 'Light drizzle',
  53: 'Drizzle',
  55: 'Heavy drizzle',
  61: 'Light rain',
  63: 'Rain',
  65: 'Heavy rain',
  71: 'Light snow',
  73: 'Snow',
  75: 'Heavy snow',
  77: 'Snow grains',
  80: 'Showers',
  81: 'Rain showers',
  82: 'Heavy showers',
  85: 'Snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm + hail',
  99: 'Severe thunderstorm',
};

const WEATHER_ICONS = {
  0: 'ph-sun',
  1: 'ph-sun',
  2: 'ph-cloud-sun',
  3: 'ph-cloud',
  45: 'ph-cloud-fog',
  48: 'ph-cloud-fog',
  51: 'ph-cloud-rain',
  53: 'ph-cloud-rain',
  55: 'ph-cloud-rain',
  61: 'ph-cloud-rain',
  63: 'ph-cloud-rain',
  65: 'ph-cloud-rain',
  71: 'ph-snowflake',
  73: 'ph-snowflake',
  75: 'ph-snowflake',
  77: 'ph-snowflake',
  80: 'ph-cloud-rain',
  81: 'ph-cloud-rain',
  82: 'ph-cloud-rain',
  85: 'ph-snowflake',
  86: 'ph-snowflake',
  95: 'ph-cloud-lightning',
  96: 'ph-cloud-lightning',
  99: 'ph-cloud-lightning',
};

export let currentWeatherCode = null;
export let currentTemp = null;

export async function fetchWeather(element) {
  try {
    const res = await fetch(WEATHER_URL);
    if (!res.ok) return;
    const data = await res.json();
    currentTemp = Math.round(data.current.temperature_2m);
    currentWeatherCode = data.current.weather_code;
    const feelsLike = Math.round(data.current.apparent_temperature);
    const wind = Math.round(data.current.wind_speed_10m);
    const desc = WEATHER_DESC[currentWeatherCode] || 'Unknown';
    const icon = WEATHER_ICONS[currentWeatherCode] || 'ph-thermometer';

    element.innerHTML = `
      <span class="weather-top">
        <i class="ph-bold ${icon} weather-icon"></i>
        <span class="weather-temp">${currentTemp}°C</span>
        <span class="weather-desc">${desc}</span>
      </span>
      <span class="weather-detail">Feels ${feelsLike}° · Wind ${wind} km/h</span>
    `;
  } catch (err) {
    console.warn('Weather fetch failed:', err);
  }
}
