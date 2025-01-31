const hamburgerButton = document.getElementById("hamButton");
const eventList = document.getElementById("events-list");
const weatherButtons = document.querySelectorAll(".weather-button");
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const forecastList = document.getElementById("forecast-list");

const lat = 47.60591;
const lon = -122.33156;
const membersPath = "data/members.json";

async function getMembers() {
  const response = await fetch(membersPath);
  const members = await response.json();
  
  showCurrentEvents(members);
}

async function getCurrentWeather(latitude, longitude) {
  const url = `//api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=d058bca00aab868d78e766a79f4ed821`;
  try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        await displayWeatherResults(data);
        getForecast(latitude, longitude);
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
}

async function getForecast(latitude, longitude) {
  const url = `//api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=d058bca00aab868d78e766a79f4ed821`;
  try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        displayForecast(data);
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
}

function addEventListeners(weatherButtons) {
  weatherButtons.forEach(button => {
    button.addEventListener("click", () => {
      switch (button.id) {
        case "getSeattleWeather":
          latitude = 47.60621;
          longitude = -122.33207;
          break;
        case "getSpokaneWeather":
          latitude = 47.65872;
          longitude = -117.42605;
          break;
        case "getTacomaWeather":
          latitude = 47.25288;
          longitude = -122.44429;
          break;
        case "getOlympiaWeather":
          latitude = 47.03787;
          longitude = -122.90069;
          break;
        case "getVancouverWeather":
          latitude = 49.28273;
          longitude = -123.12074;
          break;
        case "getBattleGroundWeather":
          latitude = 45.78849;
          longitude = -122.53369;
      }
      getCurrentWeather(latitude, longitude);
    });
  });
}

function showCurrentEvents(members) {
  const currentMembers = members.filter(member => member.current);
  eventList.innerHTML = currentMembers.map(member => `
      <li class="event-item level${member.membershipLevel}">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <p>Membership Level: ${member.membershipLevel}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p>${member.eventDescription}</p>
      </li>
  `).join("");
  showSpotlight(members);
};

function showSpotlight(members) {
  const spotlight = document.getElementById("spotlight");
  const filteredMembers = members.filter(member => member.membershipLevel >= 2);
  for (let i = 0; i < 3; i++) {
    const index = Math.floor(Math.random() * filteredMembers.length);
    const randomMember = filteredMembers[index];
    filteredMembers.splice(index, 1);
    spotlight.innerHTML += `
    <div class="spotlight-card level${randomMember.membershipLevel}">
    <h3>${randomMember.name}</h3>
    <img src="${randomMember.image}" alt="${randomMember.name}">
    <div class="spotlight-item">
    <p>${randomMember.address},</p>
    <p>${randomMember.phone}, </p>
    <p>Membership Level: ${randomMember.membershipLevel}</p>
    <a href="${randomMember.website}" target="_blank">Visit Website</a>
    </div>
    </div>
  `;
  }
}

function displayWeatherResults(data) {
  currentWeather = document.getElementById("current-weather");
  currentWeather.innerHTML = "";
  document.getElementById("temperature").textContent = `The current temperature in ${data.name} is ${Math.round(data.main.temp)}°F`;
  data.weather.forEach(weather => {
    const figure = document.createElement('figure');
    const icon = document.createElement('img');
    const caption = document.createElement('figcaption');
    const iconsrc = `https://openweathermap.org/img/w/${weather.icon}.png`;
    const desc = capitalizeWords(weather.description);
    icon.setAttribute('class', "weather-icon");
    icon.setAttribute('src', iconsrc);
    icon.setAttribute('alt', desc);
    caption.textContent = desc;
    figure.appendChild(icon);
    figure.appendChild(caption);
    currentWeather.appendChild(figure);
  });
}

function displayForecast(data) {
  forecastList.innerHTML = "";
  const array = data.list.slice(0, 24);
  array.forEach(day => {
    const iconsrc = `https://openweathermap.org/img/w/${day.weather[0].icon}.png`;
    let desc = capitalizeWords(day.weather[0].description);
    forecastList.innerHTML += `
    <li class="forecast-item">
      <h3>${new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "long" })} ${new Date(day.dt * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</h3>
      <p>Temperature: ${Math.round(day.main.temp)}°F</p>
      <img src="${iconsrc}" alt="${desc}">
      <p>${desc}</p>
    </li>`;
  });
};

function capitalizeWords(string) {
  return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

hamburgerButton.addEventListener("click", () => {
  const nav = document.querySelector("nav");
  const ul = document.querySelector("nav ul");
  ul.classList.toggle("show");
  nav.classList.toggle("show");
  if (nav.classList.contains("show")) {
    hamburgerButton.innerHTML = "&#x2715;";
  } else {
    hamburgerButton.innerHTML = "&#9776;";
  }
});

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

getMembers();
addEventListeners(weatherButtons);