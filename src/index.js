import './style/header.css';
import { getWeatherData } from './scripts/data';

getWeatherData('Budapest').then((resp) => console.log(resp));
