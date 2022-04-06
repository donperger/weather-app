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

export { getWeatherData };
