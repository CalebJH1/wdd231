const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');
const buttons = document.querySelectorAll('.filter');
let prophets = [];

async function getProphetData() {
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        prophets = data.prophets;
        displayProphets(prophets); 
    }
}

const displayProphets = (prophets) => {
    prophets.forEach(prophet => {
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let portrait = document.createElement('img');
        let birthDate = document.createElement('p');
        let deathDate = document.createElement('p');
        let birthPlace = document.createElement('p');
        let numOfChildren = document.createElement('p');
        let length = document.createElement('p');
        let prophetNumber = document.createElement('p');

        fullName.textContent = `${prophet.name} ${prophet.lastname}`;

        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '170');
        portrait.setAttribute('height', '220');

        birthDate.textContent = `Birth: ${prophet.birthdate}`;
        deathDate.textContent = `Death: ${prophet.death || 'Currently alive'}`;
        birthPlace.textContent = `Birthplace: ${prophet.birthplace}`;
        numOfChildren.textContent = `Number of Children: ${prophet.numofchildren}`;
        length.textContent = `Served for: ${prophet.length} year(s).`;
        prophetNumber.textContent = `Prophet No. ${prophet.order}`;

        card.appendChild(fullName);
        card.appendChild(portrait);
        card.appendChild(birthDate);
        card.appendChild(deathDate);
        card.appendChild(birthPlace);
        card.appendChild(numOfChildren);
        card.appendChild(length);
        card.appendChild(prophetNumber);

        cards.appendChild(card);
    });
    console.log(prophets);
};

const filterProphets = (buttonPressed) => {
    cards.innerHTML = '';

    let filteredProphets;

    switch (buttonPressed.target.id) {
        case 'all': filteredProphets = prophets; break;
        case 'bornInUtah':
            filteredProphets = prophets.filter(prophet => prophet.birthplace === 'Utah');
            break;
        case 'bornOutsideUS':
            filteredProphets = prophets.filter(prophet => prophet.birthplace === 'England');
            break;
        case 'olderThan94':
            filteredProphets = prophets.filter(prophet => {
                const birthYear = new Date(prophet.birthdate).getFullYear();
                const deathYear = prophet.death ? new Date(prophet.death).getFullYear() : new Date().getFullYear();
                const age = deathYear - birthYear;
                console.log(`${prophet.name} ${prophet.lastname} lived to ${age} years old.`);
                return age >= 95;
            });
            break;
        case 'atLeast10Kids':
            filteredProphets = prophets.filter(prophet => prophet.numofchildren >= 10);
            break;
        case 'atLeast15Years':
            filteredProphets = prophets.filter(prophet => prophet.length >= 15);
            break;
        default:
            filteredProphets = prophets;
    }

    displayProphets(filteredProphets);
};

buttons.forEach((button) => {
    button.addEventListener('click', filterProphets);
});

getProphetData();