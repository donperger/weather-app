import coutryList from 'iso-3166-1';
import format from 'date-fns/format';
import { displayError } from './dom';

const apiKey = '7f89d5237ab00448abd5917a1fcda1e1';
const giphyApiKey = 'dBvd3yjgUf3MSFg4PHokeHfOIOIN0onn';

async function getCoord(cityName, countryCode) {
  const countryName = coutryList.whereAlpha2(countryCode).country;

  try {
    const resp = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${countryCode}&limit=5&appid=${apiKey}`,
      { mode: 'cors' }
    );
    const cityData = await resp.json();
    const checkedCityData = checkCityData(cityData, cityName, countryCode);

    const lat = checkedCityData[0].lat;
    const lon = checkedCityData[0].lon;

    return { lat, lon };
  } catch (err) {
    displayError('no city', cityName, countryName);
  }
}

function checkCityData(cityData, cityName, countryCode) {
  const filteredCityDatat = cityData.filter((city) => {
    if (city.name === cityName && city.country === countryCode) {
      return city;
    } else {
      return false;
    }
  });

  return filteredCityDatat;
}

async function getWeatherData(city, country) {
  try {
    const cityCoordinates = await getCoord(city, country);
    const resp = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${cityCoordinates.lat}&lon=${cityCoordinates.lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${apiKey}`,
      { mode: 'cors' }
    );
    const weatehrData = await resp.json();

    return weatehrData;
  } catch (err) {
    console.log(err);
  }
}

function processData(weatherData, cityName, countryCode) {
  const city = cityName;
  const country = coutryList.whereAlpha2(countryCode).country;
  const feelsLike = weatherData.feels_like;
  const feels_like_day = feelsLike.day;
  const feels_like_night = feelsLike.night;
  const humidity = weatherData.humidity;
  const temperature = weatherData.temp;
  const temperature_day = temperature.day;
  const temperature_night = temperature.night;
  const uvindex = weatherData.uvi;
  const iconId = weatherData.weather[0].icon;
  const avgWindSpeed = weatherData.wind_speed;
  const search_word = weatherData.weather[0].description;

  return {
    city,
    country,
    feels_like_day,
    feels_like_night,
    humidity,
    temperature_day,
    temperature_night,
    uvindex,
    iconId,
    avgWindSpeed,
    search_word,
  };
}

async function getIcon(id) {
  try {
    const resp = await fetch(`https://openweathermap.org/img/wn/${id}.png`, {
      mode: 'cors',
    });
    return resp;
  } catch (err) {
    console.log(err);
  }
}

function getAllCountry() {
  return coutryList.all();
}

function getDates() {
  const today = new Date();
  const dates = [format(today, 'MMMM dd, y')];

  for (let i = 1; i < 8; i++) {
    const day = new Date();
    day.setDate(today.getDate() + i);
    dates.push(format(day, 'MMMM dd'));
  }

  return dates;
}

async function getGif(searchWord) {
  const resp = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=${giphyApiKey}&s=${searchWord}`,
    { mode: 'cors' }
  );

  const gif = await resp.json();

  if (gif.data.images.original) {
    return gif.data.images.original;
  }
}

export {
  getWeatherData,
  processData,
  getIcon,
  getAllCountry,
  getDates,
  getGif,
};
