import './img/icons8-github.svg';

import './style/main.css';
import './style/cards.css';

import { getWeatherData, processData } from './scripts/data';
import {
  createTodayCard,
  displayHeaderDate,
  fillUpCountrySelector,
  fillForecast,
} from './scripts/dom';

const serachBtn = document.querySelector('.search-btn');
const cityInput = document.querySelector('#city');
const countryInput = document.querySelector('#country');

displayHeaderDate();
fillUpCountrySelector();
serachBtn.addEventListener('click', () => {
  const city = capitalizeEveryFirstLetter(cityInput.value);
  getWeatherData(city, countryInput.value).then((resp) => {
    const unproccesseddata = resp.daily;
    const processedData = unproccesseddata.map((dailyData) => {
      return processData(dailyData, city, countryInput.value);
    });

    createTodayCard(processedData[0]);
    fillForecast(processedData.slice(1));
  });
});

getWeatherData('Budapest', 'HU').then((resp) => {
  const unproccesseddata = resp.daily;
  const processedData = unproccesseddata.map((dailyData) => {
    return processData(dailyData, 'Budapest', 'HU');
  });

  createTodayCard(processedData[0]);
  fillForecast(processedData.slice(1));
});

function capitalizeEveryFirstLetter(string) {
  const words = string.split(' ');
  const capitalizedWords = words.map((word) => {
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
  });

  return capitalizedWords.join(' ');
}
