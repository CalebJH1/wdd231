const hamburgerButton = document.getElementById("hamButton");
const eventList = document.querySelector(".events-list");
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
  console.log(members);
  
  showCurrentEvents(members);
}

async function getCurrentWeather(latitude, longitude) {
  const url = `//api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=d058bca00aab868d78e766a79f4ed821`;
  try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        displayWeatherResults(data);
        getForecast(latitude, longitude);
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
}

async function getForecast(latitude, longitude) {
  const url = `//api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt=3&units=imperial&appid=fb4e648199f2af7fe879c45d6a46bf04`;
  try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
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
      console.log(button.id);
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
  currentMembers = members.filter(member => member.current);
  eventList.innerHTML = currentMembers.map(member => `
      <li class="event-item">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <p>Membership Level: ${member.membershipLevel}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      </li>;
  `).join("");
  showSpotlight(members);
};

function showSpotlight(members) {
  const spotlight = document.querySelector(".spotlight");
  const filteredMembers = members.filter(member => member.membershipLevel >= 2);
  for (let i = 0; i < 2; i++) {
    const index = Math.floor(Math.random() * filteredMembers.length);
    const randomMember = filteredMembers[index];
    filteredMembers.splice(index, 1);
    spotlight.innerHTML += `
    <h2>${randomMember.name}</h2>
    <p>${randomMember.address}</p>
    <p>${randomMember.phone}</p>
    <p>Membership Level: ${randomMember.membershipLevel}</p>
    <a href="${randomMember.website}" target="_blank">Visit Website</a>
  `;
  }
}

function displayWeatherResults(data) {
  document.getElementById("temperature").textContent = `The current temperature in ${data.name} is ${data.main.temp}°F`;
  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  let desc = data.weather[0].description;
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = desc;
}

function displayForecast(data) {
  forecastList.innerHTML = data.list.map(day => `
    <li class="forecast-item">
      <h3>${new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "long" })}</h3>
      <p>Temperature: ${day.main.temp}°F</p>
      <p>Weather: ${day.weather[0].description}</p>
    </li>
  `).join("");
}

// const showMembers = (view) => {
//   memberDirectory.className = view;

//   memberDirectory.innerHTML = members.map(member => `
//     <div class="member-card level${member.membershipLevel}">
//       <img src="${member.image}" alt="${member.name}">
//       <h3>${member.name}</h3>
//       <p>${member.address}</p>
//       <p>${member.phone}</p>
//       <p>Membership Level: ${member.membershipLevel}</p>
//       <a href="${member.website}" target="_blank">Visit Website</a>
//     </div>
//   `).join("");
// };

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