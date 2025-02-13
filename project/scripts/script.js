import fetchWeatherData from "./fetch-weather-data.mjs";

const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');

const currentWeather = document.getElementById('currentWeather');
const weatherForecast = document.getElementById('weatherForecast');

document.getElementById('getDataButton').addEventListener('click', async () => {
    fetchWeatherData.setCoordinates(latitude.value, longitude.value);
    currentWeather.innerHTML = '';
    weatherForecast.innerHTML = '';
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
});

const displayCurrentWeather = (data) => {
    console.log(data);
    currentWeather.innerHTML = '';
    const currentTemp = document.createElement('p');
    currentTemp.setAttribute('id', 'currentTemp');
    if (data.name === "") {
        currentTemp.textContent = `The current temperature in the area with a latitude of ${latitude.value} and a longitude of ${longitude.value} is ${Math.round(data.main.temp)}°F`;
    } else {
        currentTemp.textContent = `The current temperature in ${data.name} is ${Math.round(data.main.temp)}°F`;
    }
    currentWeather.appendChild(currentTemp);
    data.weather.forEach(weather => {
        const figure = document.createElement('figure');
        const icon = document.createElement('img');
        const caption = document.createElement('figcaption');
        const iconsrc = `https://openweathermap.org/img/w/${weather.icon}.png`;
        const desc = weather.description;
        icon.setAttribute('class', "weather-icon");
        icon.setAttribute('src', iconsrc);
        icon.setAttribute('alt', desc);
        caption.textContent = desc;
        figure.appendChild(icon);
        figure.appendChild(caption);
        currentWeather.appendChild(figure);
    });
}

const displayForecast = (data) => {
    weatherForecast.innerHTML = '';
    data.list.forEach(day => {
        const iconsrc = `https://openweathermap.org/img/w/${day.weather[0].icon}.png`;
        const desc = day.weather[0].description;
        weatherForecast.innerHTML += `
        <li class="forecast-item">
            <h3>${new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "long" })} ${new Date(day.dt * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</h3>
            <p>Temperature: ${Math.round(day.main.temp)}°F</p>
            <img src="${iconsrc}" alt="${desc}">
            <p>${desc}</p>
        </li>`;
    });
}

const updateHistory = (data) => {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    const object = {};
    if (data.name === "") {
        object.latitude = data.coord.lat;
        object.longitude = data.coord.lon;
    } else {
        object.name = data.name;
    }
    object.temperature = data.main.temp;
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
    localStorage.setItem('history', JSON.stringify(history));
}

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;
    
