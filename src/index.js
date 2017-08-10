import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import configureStore from './store';
import { fetchLocation, fetchWeather } from './actions';

import App from './components/app';
import rootReducer from './reducers';

const store = configureStore();
store.dispatch(fetchLocation());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
