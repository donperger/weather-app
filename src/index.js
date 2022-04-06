import './style/header.css';
import { getWeatherData, processData } from './scripts/data';
import { displayHeaderDate, fillUpCountrySelector } from './scripts/dom';

const serachBtn = document.querySelector('.search-btn');
const cityInput = document.querySelector('#city');
const countryInput = document.querySelector('#country');

displayHeaderDate();
fillUpCountrySelector();
serachBtn.addEventListener('click', () =>
  console.log(cityInput.value, countryInput.value)
);

// getWeatherData('Budapest').then((resp) =>
//   console.log(processData(resp.daily[0]))
// );
