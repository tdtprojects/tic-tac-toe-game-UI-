/* eslint-disable no-underscore-dangle */
import { createStore, compose } from 'redux';

import rootReducer from './rootReducer';

let devTools = (f) => f;

if (process.browser && process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__) {
  devTools = window.__REDUX_DEVTOOLS_EXTENSION__();
}
const configureStore = (initialState = {}) =>
  createStore(
    rootReducer,
    initialState,
    compose(
      devTools,
    ),
  );

export default configureStore;
