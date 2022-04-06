import './style/header.css';
import './style/todaycard.css';
import { getIcon, getWeatherData, processData } from './scripts/data';
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
serachBtn.addEventListener('click', () =>
  console.log(cityInput.value, countryInput.value)
);

getWeatherData('Budapest').then((resp) => {
  const unproccesseddata = resp.daily[0];
  const processedData = processData(unproccesseddata);
  createTodayCard(processedData);
});
