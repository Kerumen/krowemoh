/**
 * Dependencies
 */

import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './redux/reducers';
import middlewares from './redux/middlewares';

import App from './modules/App';

import './main.css';

/**
 * Create store
 */

const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middlewares)));

/**
 * Render the app
 */

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('products'),
);
