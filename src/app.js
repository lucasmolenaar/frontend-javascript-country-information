import axios from 'axios';

async function fetchCountries() {
    try {
        const countries = await axios.get('https://restcountries.com/v2/all');
        createListItems(countries)

    } catch (e) {
        console.log(e);
    }
}

fetchCountries();

function createListItems(countries) {
    const countriesUl = document.getElementById('countries-list');
    let textColor = createRegionColor(region);

    countriesUl.innerHTML = countries.data.map((country) => {
        const {region, flag, name, population} = country;
        return `
            <li class="country-item">
                <div class="img-title">
                    <img class="country-flag" src="${flag}" alt="country-flag">
                    <h2 class="${textColor}">${name}</h2>
                </div>    
                <p>Has a population of ${population} people</p>
            </li>
        ` 
        }).join('');
}

function createRegionColor(region) {
    switch (region) {
        case 'Africa':
            return 'blue';
        case 'Americas':
            return 'green';
        case 'Asia':
            return 'red';
        case 'Europe':
            return 'yellow';
        case 'Oceania':
            return 'purple';
        default:
            return 'default';
    }
}





