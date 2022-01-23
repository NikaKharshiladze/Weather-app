const btn = document.querySelector(".search-btn");
const appContainer = document.querySelector(".app-container");
const apiKey = "b232f4b1b189a861b611f935ce62e4ab";

const getLocation = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
const kelvinToDegrees = function (kelvin) {
  return kelvin - 273;
};

const renderError = function (err) {
  const errMsg = document.createElement("div");
  errMsg.innerHTML = `<h1>${err.message}</h1>`;
  appContainer.append(errMsg);
  errMsg.classList.add("errMsg");
};

const renderWeather = function (weatherData) {
  const html = ` <div class="results-container">
     <img id="weather-icon" src="./assets/03_iday.svg" alt="Weather icon" />
     <div class="weather-info">
       <h2 class="city-name">Weather in ${weatherData.name}</h2>
       <h2 class="temperature">${Math.round(
         kelvinToDegrees(weatherData.main.temp)
       )}<span>°C</span></h2>
       <h4 class="weather-type">${weatherData.weather[0].description}</h4>
       <p class="Humidity">Humidity: ${
         weatherData.main.humidity
       }<span>%</span></p>
       <p class="wind-speed">Wind Speed: ${
         weatherData.wind.speed
       }<span>km/h</span></p>
     </div>
  </div>
     `;
  appContainer.insertAdjacentHTML("beforeend", html);
};

const getWeatherData = async function () {
  try {
    const location = await getLocation();
    const { latitude, longitude } = location.coords;

    //Using City name
    //  `https://api.openweathermap.org/data/2.5/weather?q=London&appid=b232f4b1b189a861b611f935ce62e4ab`

    const resWeather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
    );

    if (!resWeather.ok) throw new Error("Could not get your location weather");

    const weatherData = await resWeather.json();

    renderWeather(weatherData);
  } catch (err) {
    console.log(err);
    renderError(err);
  }
};
getWeatherData();
