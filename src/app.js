import axios from 'axios';

generateCountryList();

async function generateCountryList() {
    try {
        const countries = await axios.get('https://restcountries.com/v2/all');

        const countriesUl = document.getElementById('countries-list');

        const countryList = await countries.data.map((country) => {
            const {region, flag, name, population} = country;
            let textColor = createRegionColor(region);

            return `
                <li class="country-item">
                    <div class="img-title">
                        <img class="country-flag" src="${flag}" alt="country-flag">
                        <h2 class="${textColor}">${name}</h2>
                    </div>    
                    <p>Has a population of ${population} people</p>
                </li>
            `
        });

        countriesUl.innerHTML = `${countryList.join('')}`;
    } catch (e) {
        console.log(e);
    }
}

async function createRegionColor(region) {
    let textColor;
    switch (region) {
        case 'Africa':
            textColor = 'blue';
            break;
        case 'Americas':
            textColor = 'green';
            break;
        case 'Asia':
            textColor = 'red';
            break;
        case 'Europe':
            textColor = 'yellow';
            break;
        case 'Oceania':
            textColor = 'purple';
            break;
        default:
            textColor = 'black';
    }

    return textColor;
}





