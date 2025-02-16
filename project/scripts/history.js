const historyContainer = document.getElementById('history');
const dialog = document.querySelector('dialog');

const displayHistory = (history) => {
    history.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.setAttribute('class', 'history-item');

        const h2 = document.createElement('h2');
        if ('name' in item) {
            h2.textContent = item.name;
        } else {
            h2.textContent = `${item.latitude} ${item.longitude}`;
        }
        historyItem.appendChild(h2);

        const showMoreButton = document.createElement('button');
        showMoreButton.textContent = "Show More";
        showMoreButton.addEventListener('click', () => {
            dialog.innerHTML = '';
            dialog.showModal();

            const name = document.createElement('h3');
            const coordinates = document.createElement('p');
            const temperature = document.createElement('p');
            const closeButton = document.createElement('button');

            name.textContent = item.name || '';
            coordinates.textContent = `Coordinates: ${item.latitude}, ${item.longitude}`;
            temperature.textContent = `Temperature: ${Math.round(item.temperature)}°F`;
            closeButton.textContent = '❌';
            closeButton.addEventListener('click', () => dialog.close());
            
            dialog.appendChild(name);
            dialog.appendChild(coordinates);
            dialog.appendChild(temperature);
            dialog.appendChild(closeButton);

            item.description.forEach(description => {
                const figure = document.createElement('figure');
                const icon = document.createElement('img');
                const caption = document.createElement('figcaption');

                console.log(item.description.indexOf(description));
                icon.setAttribute('src', item.icon[item.description.indexOf(description)]);
                icon.setAttribute('alt', description);

                caption.textContent = description;

                figure.appendChild(icon);
                figure.appendChild(caption);

                dialog.appendChild(figure);

                if ('feelsLikeTemp' in item) {
                    const feelsLikeTemp = document.createElement('p');
                    const minTemp = document.createElement('p');
                    const maxTemp = document.createElement('p');
                    const wind = document.createElement('p');

                    feelsLikeTemp.textContent = `Feels like: ${Math.round(item.feelsLikeTemp)}°F`;
                    minTemp.textContent = `Minimum temperature: ${Math.round(item.minTemp)}°F`;
                    maxTemp.textContent = `Maximum temperature: ${Math.round(item.maxTemp)}°F`;
                    wind.textContent = `Wind: (Deg: ${item.windDeg}°, Speed: ${item.windSpeed} mph, Gust: ${item.windGust})`;

                    dialog.appendChild(feelsLikeTemp);
                    dialog.appendChild(minTemp);
                    dialog.appendChild(maxTemp);
                    dialog.appendChild(wind);
                }
            });

            const timeCreated = document.createElement('p');
            timeCreated.textContent = `Time created: ${item.date}, ${item.time}`;
            dialog.appendChild(timeCreated);
        });
        historyItem.appendChild(showMoreButton);

        historyContainer.appendChild(historyItem);
    });
}

const history = JSON.parse(localStorage.getItem('history'));
console.log(history);

displayHistory(history.reverse());

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;