document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const weatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityName = document.getElementById("city-name");
  const tempInfo = document.getElementById("temperature");
  const description = document.getElementById("description");
  const error = document.getElementById("error-message");

  const API_KEY = "909fff88f197e9171ef9d7ee41477c71"; //late in env variable as to hide secret key

  weatherBtn.addEventListener("click", async () => {
    const cityValue = cityInput.value.trim();
    if (!cityValue) return;
    //server always can give error response
    //server/db always in other region
    try {
      const weatherData = await fetchWeatherData(cityValue);
      displayWeatherData(weatherData);
    } catch (errorMsgs) {
      errorMsg(errorMsgs);
    }
  });

  async function fetchWeatherData(city) {
    //fetch weather
    // console.log("cityname", city);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    console.log(response);
    console.log(typeof response);
    if (!response.ok) {
      throw new Error("City not found due to incorrect city!");
    }
    //always change response to json format
    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    //display weather
    console.log(data);
    weatherInfo.classList.remove("hidden");
    const { name, main, weather, sys } = data;
    const sunrise = new Date(sys.sunrise*1000).toLocaleTimeString();
    const sunset = new Date(sys.sunset*1000).toLocaleTimeString();
    cityName.textContent = name;
    tempInfo.innerHTML = `Temperature: ${main.temp}°C <br><span>Feels like: ${main.feels_like}°C</span>`;
    description.innerHTML = `Weather: ${
      weather[0].description
    } <br><span>Sunrise: ${sunrise}  Sunset: ${sunset}</span>`;
  }

  function errorMsg(errorMsgs) {
    weatherInfo.classList.add("hidden");
    error.classList.remove("hidden");
    // error.textContent = errorMsgs;
  }
});
