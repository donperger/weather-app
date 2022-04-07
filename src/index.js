import './img/icons8-github.svg';

import './style/header.css';
import './style/todaycard.css';

import { getWeatherData, processData } from './scripts/data';
import {
  createTodayCard,
  displayHeaderDate,
  fillUpCountrySelector,
} from './scripts/dom';

const serachBtn = document.querySelector('.search-btn');
const cityInput = document.querySelector('#city');
const countryInput = document.querySelector('#country');

displayHeaderDate();
fillUpCountrySelector();
serachBtn.addEventListener('click', () => {
  const city = capitalizeEveryFirstLetter(cityInput.value);
  getWeatherData(city, countryInput.value).then((resp) => {
    const unproccesseddata = resp.daily[0];
    const processedData = processData(
      unproccesseddata,
      city,
      countryInput.value
    );
    createTodayCard(processedData);
  });
});

getWeatherData('Budapest', 'HU').then((resp) => {
  const unproccesseddata = resp.daily[0];
  const processedData = processData(unproccesseddata, 'Budapest', 'HU');
  createTodayCard(processedData);
});

function capitalizeEveryFirstLetter(string) {
  const words = string.split(' ');
  const capitalizedWords = words.map((word) => {
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
  });

  return capitalizedWords.join(' ');
}
