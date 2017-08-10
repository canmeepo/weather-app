import axios from 'axios';
const API_KEY = '7e76d39fbd4ed676341427f1e95f89ca';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export const FETCH_WEATHER = 'FETCH_WEATHER';
export const REQUEST_WEATHER = 'REQUEST_WEATHER';
export const RECEIVE_WEATHER = 'RECEIVE_WEATHER';
export const REQUEST_WEATHER_FAILED = 'REQUEST_WEATHER_FAILED';
export const REQUEST_LOCATION = 'REQUEST_LOCATION';
export const RECEIVE_LOCATION = 'RECEIVE_LOCATION';
export const ADD_CITY = 'ADD_CITY';
export const REMOVE_CITY = 'REMOVE_CITY';

export function requestWeather() {
  return {
    type: REQUEST_WEATHER
  };
}

export function requestWeatherFailed(error) {
  return {
    type: REQUEST_WEATHER_FAILED,
    error
  };
}

export function receiveWeather(json) {
  return {
    type: RECEIVE_WEATHER,
    payload: {
      json
    }
  };
}

export function fetchWeather(city) {
  const url = `${ROOT_URL}&q=${city},us`;
  const request = axios.get(url);

  return {
    type: FETCH_WEATHER,
    payload: request
  };
}

export function requestLocation() {
  return {
    type: REQUEST_LOCATION
  };
}

export function receiveLocation(location) {
  return {
    type: RECEIVE_LOCATION,
    payload: {
      location
    }
  };
}

export function fetchLocation() {
  return function(dispatch) {
    if (navigator.geolocation) {
      dispatch(requestLocation());
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log('navigator.geolocation not supported.');
    }

    function success(position) {
      const { latitude, longitude } = position.coords;
      dispatch(receiveLocation({ latitude, longitude }));
      dispatch(fetchWeather(`lat=${latitude}&lon=${longitude}`));
    }

    function error(error) {
      console.error('navigator.geolocation.getCurrentPosition - ', error);

      fetch('https://ipinfo.io/json')
        .then(response => response.json())
        .then(json => {
          const latitude = json.loc.split(',')[0];
          const longitude = json.loc.split(',')[1];
          dispatch(receiveLocation({ latitude, longitude }));
          dispatch(fetchWeather(`lat=${latitude}&lon=${longitude}`));
        })
        .catch(error => {
          console.log('error request from "https://ipinfo.io/json" : ', error);
        });
    }
  };
}
export const addCity = (id, name) => {
  return {
    type: ADD_CITY,
    id,
    name
  };
};

export const removeCity = id => {
  return {
    type: REMOVE_CITY,
    id
  };
};
