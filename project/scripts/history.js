const historyContainer = document.getElementById('history');

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
        historyItem.appendChild(showMoreButton);

        const paragraph = document.createElement('p');
        paragraph.textContent = `${item.date} ${item.time}`;
        historyItem.appendChild(paragraph);

        historyContainer.appendChild(historyItem);
    });
}



const history = JSON.parse(localStorage.getItem('history'));
console.log(history);

displayHistory(history);

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;