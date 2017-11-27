import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './rootReducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let middlewares = [thunk, logger]

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(...middlewares)
  )
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
