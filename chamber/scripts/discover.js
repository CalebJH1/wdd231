import {places} from '../data/places.mjs';
console.log(places);

const allPlaces = document.getElementById('allPlaces');

places.forEach(place => {
  const div = document.createElement('div');

  const h2 = document.createElement('h2');
  h2.textContent = place.name;
  div.appendChild(h2);

  const figure = document.createElement('figure');

  const img = document.createElement('img');
  img.setAttribute('src', place.photo_url);
  img.setAttribute('alt', capitalizeWords(place.photo_url.split("/")[1].split(".")[0].replaceAll("-", " ")));
  figure.appendChild(img);

  const figcaption = document.createElement('figcaption');
  figcaption.textContent = capitalizeWords(place.photo_url.split("/")[1].split(".")[0].replaceAll("-", " "));
  figure.appendChild(figcaption);
  
  div.appendChild(figure);

  const address = document.createElement('address');
  address.textContent = place.address;
  div.appendChild(address);

  const paragraph = document.createElement('p');
  paragraph.textContent = place.description;
  div.appendChild(paragraph);

  const button = document.createElement('button');
  button.textContent = "Learn More";
  div.appendChild(button);

  allPlaces.appendChild(div);
});

function capitalizeWords(string) {
  return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function displayLastVisited() {
  const lastVisited = document.getElementById('lastVisited');

  const oldDate = JSON.parse(localStorage.getItem('date')) || 0;

  const newDate = new Date().getTime();

  localStorage.setItem('date', JSON.stringify(newDate));

  if (oldDate !== 0) {
    const differenceInSeconds = newDate / 1000 - oldDate / 1000;

    const differenceInDays = differenceInSeconds / (60 * 60 * 24);

    if (differenceInDays < 1) {
      lastVisited.textContent = "Back so soon! Awesome!";
    } else {
      if (Math.trunc(differenceInDays) === 1) {
        lastVisited.textContent = "You last visited a day ago."
      } else {
        lastVisited.textContent = `You last visited ${Math.trunc(differenceInDays)} days ago.`;
      }
    }
  } else {
    lastVisited.textContent = "Welcome! Let us know if you have any questions.";
  }
}

displayLastVisited();

const hamburgerButton = document.getElementById("hamButton");

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