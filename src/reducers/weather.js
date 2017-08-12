import {
  REQUEST_WEATHER,
  REQUEST_WEATHER_FAILED,
  RECEIVE_WEATHER,
  REQUEST_FORECAST,
  REQUEST_FORECAST_FAILED,
  RECEIVE_FORECAST
} from '../actions';

const weather = (state = [], action) => {
  switch (action.type) {
    case REQUEST_WEATHER:
      return {
        ...state,
        isFetchingCurrent: true
      };
    case REQUEST_WEATHER_FAILED:
      return {
        ...state,
        isFetchingCurrent: false,
        error: action.error
      };
    case RECEIVE_WEATHER: {
      let state1 = { ...state };
      delete state1.error;
      return {
        ...state1,
        isFetchingCurrent: false,
        current: action.payload.json
      };
    }
    case REQUEST_FORECAST:
      return {
        ...state,
        isFetchingForecast: true
      };
    case REQUEST_FORECAST_FAILED:
      return {
        ...state,
        isFetchingForecast: false,
        error: action.error
      };
    case RECEIVE_FORECAST:
      return {
        ...state,
        isFetchingForecast: false,
        forecast: action.payload.json
      };
    default:
      return state;
  }
};
export default weather;
