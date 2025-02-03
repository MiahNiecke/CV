const location = document.getElementById("location");
const degrees = document.getElementById("degrees");
const maxDegrees = document.getElementById("max-degrees");
const minDegrees = document.getElementById("min-degrees");
const description = document.getElementById("description");

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
  const API_KEY = "19b057c596269678ef73a8d3e9ff550b";
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      degrees.innerHTML = `${data.main.temp}°C`;
      maxDegrees.innerHTML = `${data.main.temp_max}°C`;
      minDegrees.innerHTML = `${data.main.temp_min}°C`;
      description.innerHTML = data.weather[0].description;
    });
}
