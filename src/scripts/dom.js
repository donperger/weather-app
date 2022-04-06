import { getDates, getAllCountry } from './data';

const todayCont = document.querySelector('.today-container');
const countryDropdown = document.querySelector('#country');

const dates = getDates();
const countries = getAllCountry();

function displayHeaderDate() {
  todayCont.textContent = dates[0];
}

function fillUpCountrySelector() {
  countries.forEach((country) => {
    const optionElem = document.createElement('option');
    optionElem.setAttribute('value', country.alpha2);
    optionElem.textContent = country.country;

    countryDropdown.appendChild(optionElem);
  });
}

export { displayHeaderDate, fillUpCountrySelector };
