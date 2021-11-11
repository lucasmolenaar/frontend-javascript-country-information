import axios from 'axios';

async function fetchCountryByName() {
    try {
        const result = await (await axios.get('https://restcountries.com/v2/name/netherlands')).data[0];
        console.log(result);

        const {name, flag, population, capital, subregion} = await (await axios.get('https://restcountries.com/v2/name/netherlands')).data[0];
        const {name: currency} = await (await axios.get('https://restcountries.com/v2/name/netherlands')).data[0].currencies[0];
        const {name: language} = await (await axios.get('https://restcountries.com/v2/name/netherlands')).data[0].languages[0];

        console.log(name, flag, population, capital, language, subregion, currency);
        

        createCountryInfoBox(name, flag, subregion, population, capital, language, currency);

    } catch (e) {
        console.log(e);
    }
}

fetchCountryByName();

function createCountryInfoBox(name, imgLink, subregion, population, capital, language, currency) {
    const countryName = document.querySelector('.country-name');
    const flagImg = document.querySelector('.flag-img');
    const countryInfo = document.querySelector('.country-info');

    countryName.innerHTML = name;
    flagImg.setAttribute('src', imgLink);

    countryInfo.innerHTML = `
        ${name} is situated in ${subregion}. It has a population of ${population} people.
        <br><br>
        The captital is ${capital} and you can pay with ${currency}.
        <br><br>
        They speak ${language}.
    `
}

