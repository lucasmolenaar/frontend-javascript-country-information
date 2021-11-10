import axios from 'axios';

async function fetchCountryByName() {
    try {
        const {name,  population, capital, demonym} = await (await axios.get('https://restcountries.com/v2/name/netherlands')).data[0];
        console.log(name, population, capital, demonym);
    } catch (e) {
        console.log(e);
    }
}

fetchCountryByName();