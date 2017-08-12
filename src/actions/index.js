import fetch from 'isomorphic-fetch';
const API_KEY = '7e76d39fbd4ed676341427f1e95f89ca';
const ROOT_URL = `https://api.openweathermap.org/data/2.5`;

export const FETCH_WEATHER = 'FETCH_WEATHER';
export const REQUEST_WEATHER = 'REQUEST_WEATHER';
export const RECEIVE_WEATHER = 'RECEIVE_WEATHER';
export const REQUEST_WEATHER_FAILED = 'REQUEST_WEATHER_FAILED';
export const REQUEST_FORECAST = 'REQUEST_FORECAST';
export const RECEIVE_FORECAST = 'RECEIVE_FORECAST';
export const REQUEST_FORECAST_FAILED = 'REQUEST_FORECAST_FAILED';
export const REQUEST_LOCATION = 'REQUEST_LOCATION';
export const RECEIVE_LOCATION = 'RECEIVE_LOCATION';
export const ADD_CITY = 'ADD_CITY';
export const REMOVE_CITY = 'REMOVE_CITY';

export const requestWeather = () => {
  return {
    type: REQUEST_WEATHER
  };
};

export const requestWeatherFailed = error => {
  return {
    type: REQUEST_WEATHER_FAILED,
    error
  };
};

export const receiveWeather = json => {
  return {
    type: RECEIVE_WEATHER,
    payload: {
      json
    }
  };
};

export const requestForecast = () => {
  return {
    type: REQUEST_FORECAST
  };
};

export const requestForecastFailed = error => {
  return {
    type: REQUEST_FORECAST_FAILED,
    error
  };
};

export const receiveForecast = json => {
  return {
    type: RECEIVE_FORECAST,
    payload: {
      json
    }
  };
};
export const fetchWeather = params => {
  const url = `${ROOT_URL}/weather?${params}&units=metric&appid=${API_KEY}&lang=us`;
  return function(dispatch) {
    dispatch(requestWeather());
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        if (json.cod == 200) {
          dispatch(receiveWeather(json));
        } else {
          dispatch(requestWeatherFailed(json.message));
        }
      })
      .catch(error => dispatch(requestWeatherFailed(error.toString())));
  };
};
export const fetchForecast = params => {
  const url = `${ROOT_URL}/forecast?${params}&units=metric&appid=${API_KEY}&lang=us`;

  return function(dispatch) {
    dispatch(requestForecast());

    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveForecast(json)))
      .catch(error => {
        console.log('error happened when fetchForecast: ', error);
        dispatch(requestForecastFailed(error.toString()));
      });
  };
};
export const requestLocation = () => {
  return {
    type: REQUEST_LOCATION
  };
};

export const receiveLocation = location => {
  return {
    type: RECEIVE_LOCATION,
    payload: {
      location
    }
  };
};

export const fetchLocation = () => {
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
};
