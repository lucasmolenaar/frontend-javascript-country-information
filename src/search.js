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
        const {name, flag, population, capital, subregion} = await (await axios.get(`https://restcountries.com/v2/name/${userInput.value}`)).data[0];
        const {name: currency} = await (await axios.get(`https://restcountries.com/v2/name/${userInput.value}`)).data[0].currencies[0];
        const {name: language} = await (await axios.get(`https://restcountries.com/v2/name/${userInput.value}`)).data[0].languages[0];

        countryBox.style.display = 'block';
        createCountryInfoBox(name, flag, subregion, population, capital, language, currency);

        //Resetting values
        userInput.value =  '';
        errorText.innerHTML = '';
    } catch (e) {
        console.log(e);
        errorText.innerHTML = `${userInput.value} does not exist.`

        if (countryBox.style.display = 'block') {
            countryBox.style.display = 'none'
        }

        userInput.value =  '';
    }
}

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
};
