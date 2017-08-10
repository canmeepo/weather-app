import { REQUEST_WEATHER, REQUEST_WEATHER_FAILED, RECEIVE_WEATHER } from '../actions';

const initialState = {
  isFetchingCurrent: true
};

export default function weather(state = initialState, action) {
  switch (action.type) {
    case REQUEST_WEATHER:
      return Object.assign({}, state, {
        isFetchingCurrent: true
      });
    case REQUEST_WEATHER_FAILED:
      return Object.assign({}, state, {
        isFetchingCurrent: false,
        error: action.error
      });
    case RECEIVE_WEATHER: {
      let state1 = Object.assign({}, state);
      delete state1.error;
      return Object.assign({}, state1, {
        isFetchingCurrent: false,
        current: action.payload.json
      });
    }
    default:
      return state;
  }
}
