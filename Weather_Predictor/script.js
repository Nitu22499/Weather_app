import * as ele from 'elements.js';
import {Http} from 'http.js';
import {WeatherData, WEATHER_PROXY_HANDLER} from 'weather-data.js';

const APP_ID='';

ele.ELEMENT_SEARCH_BUTTON.addEventListener('click',searchWeather);

function searchWeather(){
    const city_name=ele.ELEMENT_SEARCHED_CITY.value.trim();
    if(city_name.length==0){
       return alert("Please enter City Name");
    }
    ele.ELEMENT_LOADING_TEXT.style.display = 'block';
    ele.ELEMENT_WEATHER_BOX.style.display = 'none';
    const URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + city_name + '&units=metric&appid=' + APP_ID;

    Http.fetchData(URL)
    .then(responseData=>{
        // console.log(responseData);
        const WEATHER_DATA = new WeatherData(city_name, responseData.weather[0].description.toUpperCase());
        // console.log(WEATHER_DATA);
        const WEATHER_PROXY = new Proxy(WEATHER_DATA, WEATHER_PROXY_HANDLER);
        WEATHER_PROXY.temperature = responseData.main.temp;
        updateWeather(WEATHER_PROXY);
    })
    .catch(error => alert(error));
}

function updateWeather(weatherData_Proxy){
    // console.log(weatherData_Proxy);
    ele.ELEMENT_WEATHER_CITY.textContent = weatherData_Proxy.cityName;
    ele.ELEMENT_WEATHER_DESCRIPTION.textContent = weatherData_Proxy.description;
    ele.ELEMENT_WEATHER_TEMPERATURE.textContent = weatherData_Proxy.temperature;
    ele.ELEMENT_LOADING_TEXT.style.display = 'none';
    ele.ELEMENT_WEATHER_BOX.style.display = 'block';

}