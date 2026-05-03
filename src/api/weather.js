// src/api/weather.js

// Safe fallback coordinates just in case the user hits "Block"
const FALLBACK_LAT = 31.2001; 
const FALLBACK_LON = 29.9187;

const getUserLocation = () => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ lat: FALLBACK_LAT, lon: FALLBACK_LON });
      return;
    }
    // 🌟 Asks the browser for the exact location
    navigator.geolocation.getCurrentPosition(
      (position) => resolve({ lat: position.coords.latitude, lon: position.coords.longitude }),
      (error) => resolve({ lat: FALLBACK_LAT, lon: FALLBACK_LON }), // User blocked it
      { timeout: 10000 }
    );
  });
};

export const fetchWeather = async () => {
  try {
    const { lat, lon } = await getUserLocation();

    // 🌟 1. Fetch Weather (Added 'is_day' to track day/night!)
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day&timezone=auto`
    );
    if (!weatherRes.ok) throw new Error("Failed to fetch weather");
    const weatherData = await weatherRes.json();

    // 🌟 2. Fetch City Name (Reverse Geocoding magic)
    const geoRes = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
    );
    
    let city = "Unknown Location";
    if (geoRes.ok) {
       const geoData = await geoRes.json();
       // Grabs the most accurate city/locality name it can find
       city = geoData.city || geoData.locality || geoData.principalSubdivision || "Unknown Location";
    }

    const temp = Math.round(weatherData.current.temperature_2m);
    const code = weatherData.current.weather_code;
    const isDay = weatherData.current.is_day === 1; // True if day, False if night

    // 🌟 3. Translate codes to conditions and Day/Night icons
    let condition = "Clear Sky";
    let iconType = isDay ? "sun" : "moon";

    if (code === 0) { condition = "Clear Sky"; iconType = isDay ? "sun" : "moon"; }
    else if (code === 1 || code === 2 || code === 3) { condition = "Partly Cloudy"; iconType = isDay ? "cloud-sun" : "cloud-moon"; }
    else if (code >= 45 && code <= 48) { condition = "Foggy"; iconType = "cloud"; }
    else if (code >= 51 && code <= 67) { condition = "Rainy"; iconType = "rain"; }
    else if (code >= 71 && code <= 77) { condition = "Snowy"; iconType = "snow"; }
    else if (code >= 95) { condition = "Thunderstorm"; iconType = "lightning"; }

    return { temp, condition, iconType, city };

  } catch (error) {
    console.error("Weather API Error:", error);
    return { temp: "--", condition: "Offline", iconType: "cloud", city: "Offline" }; 
  }
};