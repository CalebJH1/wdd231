import fetchWeatherData from "./fetch-weather-data.mjs";

const currentWeather = document.getElementById('currentWeather');
const weatherForecast = document.getElementById('weatherForecast');

async function fetchData() {
    const message = document.createElement('p');
    message.textContent = "Waiting...";
    currentWeather.appendChild(message);
    const data = await fetchWeatherData.getData();
    console.log(data);
    if (data[0] === undefined || data[1] === undefined) {
        message.textContent = "Something went wrong. Try again.";
    } else {
        displayCurrentWeather(data[0]);
        displayForecast(data[1]);
        updateHistory(data[0]);
    }
}

const displayCurrentWeather = (data) => {
    currentWeather.innerHTML = '';
    console.log(data);
    const currentTemp = document.createElement('p');
    currentTemp.setAttribute('id', 'currentTemp');
    if (data.name === "") {
        currentTemp.textContent = `The current temperature in the area with a latitude of ${data.coord.lat} and a longitude of ${data.coord.lon} is ${Math.round(data.main.temp)}°F`;
    } else {
        currentTemp.textContent = `The current temperature in ${data.name} is ${Math.round(data.main.temp)}°F (latitude: ${data.coord.lat}, longitude: ${data.coord.lon})`;
    }
    
    // data.weather = [{id: 800, main: 'Clear', description: 'clear sky', icon: '01n'}, {id: 800, main: 'Clear', description: 'clear sky', icon: '01n'}]
    currentWeather.appendChild(currentTemp);
    data.weather.forEach(weather => {
        const figure = document.createElement('figure');
        const icon = document.createElement('img');
        const caption = document.createElement('figcaption');
        const iconsrc = `https://openweathermap.org/img/w/${weather.icon}.png`;
        const desc = weather.description;
        icon.setAttribute('loading', 'lazy');
        icon.setAttribute('class', "weather-icon");
        icon.setAttribute('src', iconsrc);
        icon.setAttribute('alt', desc);
        caption.textContent = desc;
        figure.appendChild(icon);
        figure.appendChild(caption);
        currentWeather.appendChild(figure);
    });

    const feelsLikeTemp = document.createElement('p');
    feelsLikeTemp.setAttribute('class', 'temp-feels-like');
    feelsLikeTemp.textContent = `Feels like: ${Math.round(data.main.feels_like)}°F`;
    currentWeather.appendChild(feelsLikeTemp);

    const minTemp = document.createElement('p');
    minTemp.setAttribute('class', 'temp-min');
    minTemp.textContent = `Minimum temperature: ${Math.round(data.main.temp_min)}°F`;
    currentWeather.appendChild(minTemp);

    const maxTemp = document.createElement('p');
    maxTemp.setAttribute('class', 'temp-max');
    maxTemp.textContent = `Maximum temperature: ${Math.round(data.main.temp_max)}°F`;
    currentWeather.appendChild(maxTemp);

    const wind = document.createElement('p');
    wind.setAttribute('class', 'wind');
    wind.textContent = `Deg: ${data.wind.deg}°, Speed: ${data.wind.speed} m/s, Gust: ${data.wind.gust}`;
    currentWeather.appendChild(wind);
}

const displayForecast = (data) => {
    data.list.forEach(day => {
        const iconsrc = `https://openweathermap.org/img/w/${day.weather[0].icon}.png`;
        const desc = day.weather[0].description;
        const wind = `Deg: ${day.wind.deg}°, Speed: ${day.wind.speed} mph, Gust: ${day.wind.gust}`;
        weatherForecast.innerHTML += `
        <li class="forecast-item">
            <h3>${new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "long" })} ${new Date(day.dt * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</h3>
            <p>Temperature: ${Math.round(day.main.temp)}°F</p>
            <img loading="lazy" src="${iconsrc}" alt="${desc}">
            <p>${desc}</p>
            <p>Wind: (${wind})</p>
        </li>`;
    });
}

const updateHistory = (data) => {
    // localStorage.setItem('history', JSON.stringify([]));
    const history = JSON.parse(localStorage.getItem('history')) || [];
    const object = {};
    if (data.name !== "") {
        object.name = data.name;
    } 
    object.latitude = data.coord.lat;
    object.longitude = data.coord.lon;
    object.temperature = data.main.temp;
    object.feelsLikeTemp = data.main.feels_like;
    object.minTemp = data.main.temp_min;
    object.maxTemp = data.main.temp_max;
    object.windDeg = data.wind.deg;
    object.windSpeed = data.wind.speed;
    object.windGust = data.wind.gust;
    object.icon = [];
    object.description = [];
    data.weather.forEach(weatherData => {
        object.icon[data.weather.indexOf(weatherData)] = `https://openweathermap.org/img/w/${weatherData.icon}.png`;
        object.description[data.weather.indexOf(weatherData)] = weatherData.description;
    });
    object.date = new Date().toLocaleDateString();
    object.time = new Date().toLocaleTimeString();
    console.log(object);
    history.push(object);
    if (history.length > 20) {
        history.shift();
    };
    localStorage.setItem('history', JSON.stringify(history));
}

const url = window.location.href;

const formData = url.split("?")[1].split("&");

function show(field) {
    let result = "";

    formData.forEach((pair) => {
        if (pair.startsWith(field)) {
            result = pair.split("=")[1];
            result = result
              .replace("%40", "@")
              .replaceAll("%3A", ":")
              .replaceAll("+", " ");
        }
    });

    return result;
}

const formResults = document.getElementById("formResults");

formResults.innerHTML = `
<p>First name: ${show("first")}</p>
<p>Last name: ${show("last")}</p>
<p>Email: ${show("email")}</p>
<p>Phone number: ${show("phone")}</p>
<p>Latitude: ${show("latitude")}</p>
<p>Longitude: ${show("longitude")}</p>
`;

fetchWeatherData.setCoordinates(show("latitude"), show("longitude"));
fetchData();

const hamburgerButton = document.getElementById('hamButton');

hamburgerButton.addEventListener("click", () => {
    const nav = document.querySelector("nav");
    nav.classList.toggle("show");
    if (nav.classList.contains("show")) {
      hamburgerButton.innerHTML = "&#x2715;";
    } else {
      hamburgerButton.innerHTML = "&#9776;";
    }
  });

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;