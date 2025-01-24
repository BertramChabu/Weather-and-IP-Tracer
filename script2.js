function fetchWeatherData() {
  const city = document.getElementById('ip');
  data = city.value.trim();
  const weatherApiUrl = `http://api.weatherstack.com/current?access_key={place your key here}&query=${data}`;

  fetch(weatherApiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.current) {
        updateWeatherCard(data);
      } else {
        alert("Weather data not available for this location.");
      }
    })
    .catch((error) => console.error("Error fetching weather data:", error));
}

// Function to update the weather card
function updateWeatherCard(data) {
  const locationName = document.getElementById("location-name");
  const temperature = document.getElementById("temperature");
  const weatherDescription = document.getElementById("weather-description");
  const localTime = document.getElementById("local-time");

  locationName.textContent = data.location.name + ", " + data.location.country;
  temperature.textContent = "Temperature: " + data.current.temperature + "°C";
  weatherDescription.textContent =
    "Weather: " + data.current.weather_descriptions[0];
  localTime.textContent = "Local time: " + data.location.localtime;
}
