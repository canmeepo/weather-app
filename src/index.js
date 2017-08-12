import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import { fetchLocation } from './actions';

import App from './components/app';

const store = configureStore();
store.dispatch(fetchLocation());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
