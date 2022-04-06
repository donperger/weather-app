import { getIcon } from './data';
import { getDates, getAllCountry } from './data';

const todayCont = document.querySelector('.today-container');
const countryDropdown = document.querySelector('#country');
const todayDiv = document.querySelector('.today');

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
  console.log(todayWeatherData);
  const todayCard = document.createElement('div');
  todayCard.classList.add('today-card');

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
    todayWeatherData.avgWindSpeed,
    todayWeatherData.humidity,
    todayWeatherData.uvindex
  );
  todayCard.appendChild(infoList);

  todayDiv.appendChild(todayCard);
}

function makeTemperatureContainer(name, dayTemperature, nightTemperature) {
  const temperatureContainer = document.createElement('div');
  const containerClass = name.toLowerCase().replaceAll(' ', '-') + '-container';
  temperatureContainer.classList.add(containerClass);

  const temperatureTitle = document.createElement('div');
  temperatureTitle.textContent = `${name}`;

  const temperature = document.createElement('div');
  temperature.textContent = `${Math.round(dayTemperature)}/${Math.round(
    nightTemperature
  )}`;
  temperatureContainer.append(temperatureTitle, temperature);

  return temperatureContainer;
}

function creatInfoList(avgWind, humidity, uvIndex, className) {
  const list = document.createElement('ul');
  list.classList.add(className);

  const windListItem = document.createElement('li');
  windListItem.textContent = `Avarage wind speed: ${avgWind}`;

  const humidityListItem = document.createElement('li');
  humidityListItem.textContent = `Humidity: ${humidity}`;

  const uvIndexListItem = document.createElement('li');
  uvIndexListItem.textContent = `UV index: ${uvIndex}`;

  list.append(windListItem, humidityListItem, uvIndexListItem);

  return list;
}

export { displayHeaderDate, fillUpCountrySelector, createTodayCard };
