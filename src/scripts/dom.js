import { getGif, getIcon } from './data';
import { getDates, getAllCountry } from './data';

import loadingIndicator from '../img/Book.gif';

const todayCont = document.querySelector('.today-container');
const countryDropdown = document.querySelector('#country');
const todayDiv = document.querySelector('.today');
const forecastDiv = document.querySelector('.forecast');
const body = document.querySelector('body');

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

async function createTodayCard(todayWeatherData) {
  const todayCard = document.createElement('div');
  todayCard.classList.add('today-card');

  const cityCountryTitle = document.createElement('h1');
  cityCountryTitle.classList.add('city-and-country');
  cityCountryTitle.textContent = `${todayWeatherData.city}, ${todayWeatherData.country}`;
  todayCard.appendChild(cityCountryTitle);

  const cardTitle = document.createElement('h2');
  cardTitle.textContent = 'Today';
  todayCard.appendChild(cardTitle);

  const imgContainer = document.createElement('div');
  imgContainer.classList.add('img-container');
  const img = document.createElement('img');
  img.classList.add('today-img');
  const imgObj = await getIcon(todayWeatherData.iconId);
  img.src = imgObj.url;
  imgContainer.appendChild(img);
  todayCard.appendChild(imgContainer);

  const realTemperatureContainer = makeTemperatureContainer(
    'Today',
    todayWeatherData.temperature_day,
    todayWeatherData.temperature_night
  );
  todayCard.appendChild(realTemperatureContainer);

  const feelsLikeTemperatureContainer = makeTemperatureContainer(
    'Feels like',
    todayWeatherData.feels_like_day,
    todayWeatherData.feels_like_night
  );
  todayCard.appendChild(feelsLikeTemperatureContainer);

  const infoList = creatInfoList(
    todayWeatherData.search_word,
    todayWeatherData.avgWindSpeed,
    todayWeatherData.humidity,
    todayWeatherData.uvindex,
    'today-info'
  );
  todayCard.appendChild(infoList);

  const gif = await getGif(todayWeatherData.search_word);
  body.style.backgroundImage = `url(${gif.url})`;

  todayDiv.textContent = '';

  todayDiv.appendChild(todayCard);
}

function makeTemperatureContainer(name, dayTemperature, nightTemperature) {
  const temperatureContainer = document.createElement('div');
  const containerClass = name.toLowerCase().replaceAll(' ', '-') + '-container';
  temperatureContainer.classList.add(containerClass, 'temperature-box');

  const temperatureTitle = document.createElement('div');
  temperatureTitle.textContent = `${name}`;

  const temperature = document.createElement('div');
  temperature.classList.add('temperature-text');
  temperature.textContent = `${Math.round(dayTemperature)} °C / ${Math.round(
    nightTemperature
  )} °C`;

  temperature.addEventListener('click', () => {
    const unit = temperature.textContent.split(' ').pop();

    if (unit === '°C') {
      const convertedTemp = converToFahrenheit(
        dayTemperature,
        nightTemperature
      );

      temperature.textContent = `${convertedTemp.dayTempF} °F / ${convertedTemp.nightTempF} °F`;
    } else {
      temperature.textContent = `${Math.round(
        dayTemperature
      )} °C / ${Math.round(nightTemperature)} °C`;
    }
  });
  temperatureContainer.append(temperatureTitle, temperature);

  return temperatureContainer;
}

function creatInfoList(description, avgWind, humidity, uvIndex, className) {
  const list = document.createElement('ul');
  list.classList.add(className);

  const descriptionItem = document.createElement('li');
  descriptionItem.textContent = capitalizeFirstLetter(description);

  const windListItem = document.createElement('li');
  windListItem.textContent = `Avarage wind speed: ${avgWind} m/s`;

  const humidityListItem = document.createElement('li');
  humidityListItem.textContent = `Humidity: ${humidity} %`;

  const uvIndexListItem = document.createElement('li');
  uvIndexListItem.textContent = `UV index: ${uvIndex}`;

  list.append(descriptionItem, windListItem, humidityListItem, uvIndexListItem);

  return list;
}

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.substring(1);
}

function fillForecast(dailyData) {
  forecastDiv.textContent = '';
  const forecastDates = dates.slice(1);

  dailyData.forEach((forecast, index) => {
    createForecastCard(forecast, forecastDates[index], index).then((resp) => {
      forecastDiv.appendChild(resp);
    });
  });
}

async function createForecastCard(forecastData, forecastDate, index) {
  const forecastCard = document.createElement('div');
  forecastCard.classList.add(`forecast-${index}`);

  const forecastDatteTitle = document.createElement('h2');
  forecastDatteTitle.textContent = forecastDate;
  forecastCard.appendChild(forecastDatteTitle);

  const imgContainer = document.createElement('div');
  imgContainer.classList.add('img-container-forecast');
  const img = document.createElement('img');
  img.classList.add('img-forecast');
  const imgObj = await getIcon(forecastData.iconId);
  img.src = imgObj.url;
  imgContainer.appendChild(img);
  forecastCard.appendChild(imgContainer);

  const realTemperatureContainer = makeTemperatureContainer(
    'Temperature',
    forecastData.temperature_day,
    forecastData.temperature_night
  );
  forecastCard.appendChild(realTemperatureContainer);

  const infoList = creatInfoList(
    forecastData.search_word,
    forecastData.avgWindSpeed,
    forecastData.humidity,
    forecastData.uvindex,
    'info-forecast'
  );
  forecastCard.appendChild(infoList);

  return forecastCard;
}

function converToFahrenheit(dayTemp, nightTemp) {
  const dayTempF = Math.round(dayTemp * 1.8 + 32);
  const nightTempF = Math.round(nightTemp * 1.8 + 32);

  return { dayTempF, nightTempF };
}

function showLoadingIndicator() {
  cleanPage();

  const indicatorImg = document.createElement('img');
  indicatorImg.classList.add('loading-indicator');
  indicatorImg.src = loadingIndicator;

  todayDiv.appendChild(indicatorImg);
}

function displayError(erroType, city, country) {
  const errorDiv = document.createElement('div');
  errorDiv.classList.add('error-msg');

  cleanPage();

  if (erroType === 'no city') {
    errorDiv.textContent = `Sorry, can't find ${city} in ${country}. :(`;
  } else {
    errorDiv.textContent = "Can't find weather forecast. :(";
  }

  todayDiv.appendChild(errorDiv);
}

function cleanPage() {
  body.style.backgroundImage = 'none';
  todayDiv.textContent = '';
  forecastDiv.textContent = '';
}

export {
  displayHeaderDate,
  fillUpCountrySelector,
  createTodayCard,
  fillForecast,
  showLoadingIndicator,
  displayError,
};
