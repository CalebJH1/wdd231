import {temples} from '../data/temples.js'
// console.log(temples);

import {url} from '../data/temples.js'
// console.log(url);

const showHere = document.querySelector("#showHere");
const mydialog = document.querySelector('#mydialog');
const mytitle = document.querySelector('#mydialog h2');
const myclose = document.querySelector('#mydialog button');
const myinfo = document.querySelector('#mydialog p');

myclose.addEventListener("click", () => mydialog.close())

function displayItems(data) {
    console.log(data);
    data.forEach(datum => {
        console.log(datum);
        const photo = document.createElement('img');
        photo.src = `${url}${datum.path}`;
        photo.alt = datum.name;
        
        photo.addEventListener('click', () => showStuff(datum));

        showHere.appendChild(photo);
    });
}

function showStuff(datum) {
    mytitle.innerHTML = datum.name;
    myinfo.innerHTML = `Dedicated ${datum.dedicated} by ${datum.person} as temple number ${datum.number}`;
    mydialog.showModal();
}

displayItems(temples);