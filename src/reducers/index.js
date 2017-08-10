import { combineReducers } from 'redux';
import Weather from './weather';
import Location from './location';

const rootReducer = combineReducers({
  Weather,
  Location
});

export default rootReducer;
