const btn = document.querySelector(".search-btn");
const results = document.querySelector(".results");
const appContainer = document.querySelector(".app-container");
const input = document.querySelector(".search-input");
const apiKey = "b232f4b1b189a861b611f935ce62e4ab";

const getLocation = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
const kelvinToDegrees = function (kelvin) {
  return kelvin - 273;
};

const renderError = function (err = "Some kind of error happened") {
  const errMsg = document.createElement("div");
  errMsg.innerHTML = `<h1>Error : ${err.message}</h1>`;
  appContainer.append(errMsg);
  errMsg.classList.add("errMsg");
};

const renderWeather = function (weatherData) {
  let html = ` <div class="results-container">
     <img id="weather-icon" src="https://openweathermap.org/img/wn/${
       weatherData.weather[0].icon
     }.png" alt="Weather icon" />
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
  results.insertAdjacentHTML("beforeend", html);
  return html;
};

const getWeatherData = async function () {
  try {
    const location = await getLocation();
    const { latitude, longitude } = location.coords;

    const resWeather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
    );

    if (!resWeather.ok) throw new Error("Could not get your location weather");

    const weatherData = await resWeather.json();

    renderWeather(weatherData);

    btn.addEventListener("click", async function (e) {
      e.preventDefault();
      const resWeather = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=b232f4b1b189a861b611f935ce62e4ab`
      );
      if (!input.value) return;
      if (!resWeather.ok)
        throw new Error("Could not get your location weather");
      const weatherData = await resWeather.json();
      console.log(weatherData);
      input.value = "";
      results.innerHTML = renderWeather(weatherData);
    });
  } catch (err) {
    console.log(err);
    renderError(err);
  }
};
getWeatherData();
