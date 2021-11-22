import axios from 'axios';

//Selectors
const userInput = document.getElementById('input');
const countryBox = document.querySelector('.country-box');
const form = document.getElementById('form');
const errorText = document.getElementById('error');

//Event listener
form.addEventListener('submit', (e) => {
    e.preventDefault();
    fetchCountryByName();
});

//Functions
async function fetchCountryByName() {
    try {
        //Destructering variables from data
        const {name, flag, population, capital, subregion, currencies, languages} = await (await axios.get(`https://restcountries.com/v2/name/${userInput.value}`)).data[0];

        countryBox.style.display = 'block';
        createCountryInfoBox(name, flag, subregion, population, capital, languages, currencies);

        //Resetting values
        userInput.value =  '';
        errorText.innerHTML = '';
    } catch (e) {
        console.log(e);
        errorText.innerHTML = `${userInput.value} does not exist.`

        if (countryBox.style.display = 'block') {countryBox.style.display = 'none'}
        userInput.value =  '';
    }
}

function createCountryInfoBox(name, imgLink, subregion, population, capital, languages, currencies) {
    const countryName = document.querySelector('.country-name');
    const flagImg = document.querySelector('.flag-img');
    const countryInfo = document.querySelector('.country-info');
    let currency = '';

    if (currencies.length === 2) {
        currency = `${currencies[0].name} and ${currencies[1].name}`;
    } else {
        currency = `${currencies[0].name}`;
    }

    countryName.innerHTML = name;
    flagImg.setAttribute('src', imgLink);

    countryInfo.innerHTML = `
        ${name} is situated in ${subregion}. It has a population of ${population} people.
        <br><br>
        The captital is ${capital} and you can pay with ${currency}.
        <br><br>
        They speak ${getLanguages(languages)}.
    `
};

//Bonus opdracht - werkt nog niet goed
function getLanguages(languages) {
    let language = '';

    if (languages.length === 1) {
        language = `${languages[0].name}`;
    } else if (languages.length === 2) {
        language = `${languages[0].name} and ${languages[1].name}`;
    } else {
        for (let i = 0; i < languages.length; i++) {
            if (languages[i] - 1 === languages.length) {
                language += `and ${languages[i].name}`;
            } else {
                language += `${languages[i].name}, `;
            }
            
        }
    }

    return language;
}