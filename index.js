const location = document.getElementById("location");
const degrees = document.getElementById("degrees");
const maxDegrees = document.getElementById("max-degrees");
const minDegrees = document.getElementById("min-degrees");

window.onload = displayWeatherAndLocation();

async function displayWeatherAndLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      displayLocation(latitude, longitude);
      displayWeather(latitude, longitude);
    });
  } else {
    location.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function displayLocation(latitude, longitude) {
  fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      location.innerHTML = `${data.address.country}, ${data.address.county}`;
    });
}

function displayWeather(latitude, longitude) {
  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_min,temperature_2m_max`
  )
    .then((response) => response.json())
    .then((data) => {
      degrees.innerHTML = `${data.current_weather.temperature}°C`;
      maxDegrees.innerHTML = `${data.daily.temperature_2m_max[0]}°C`;
      minDegrees.innerHTML = `${data.daily.temperature_2m_min[0]}°C`;
    });
}
