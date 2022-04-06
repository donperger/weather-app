import coutryList from 'iso-3166-1';
const apiKey = '7f89d5237ab00448abd5917a1fcda1e1';

async function getCoord(cityName) {
  try {
    const resp = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`,
      { mode: 'cors' }
    );
    const cityData = await resp.json();

    const lat = cityData[0].lat;
    const lon = cityData[0].lon;

    return { lat, lon };
  } catch (err) {
    console.log(err);
  }
}

async function getWeatherData(city) {
  try {
    const cityCoordinates = await getCoord(city);
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

function processData(weatherData) {
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

  return {
    feels_like_day,
    feels_like_night,
    humidity,
    temperature_day,
    temperature_night,
    uvindex,
    iconId,
    avgWindSpeed,
  };
}

async function getIcon(id) {
  const resp = await fetch(`http://openweathermap.org/img/wn/${id}.png`, {
    mode: 'cors',
  });

  return resp;
}

function getAllCountry() {
  return coutryList.all();
}

function getDates() {
  const today = new Date();
  const dates = [today.toLocaleDateString('en-US')];

  for (let i = 1; i < 8; i++) {
    const day = new Date();
    day.setDate(today.getDate() + i);
    dates.push(day.toLocaleDateString('en-US'));
  }

  return dates;
}

export { getWeatherData, processData, getIcon, getAllCountry, getDates };
