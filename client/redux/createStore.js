/**
 * Created by amitava on 01/07/16.
 */
import { createStore, applyMiddleware } from 'redux';
import {browserHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';
import promiseMiddleware from './middleware/promise';
import thunk from 'redux-thunk';

import reducer from './modules/reducer';

export default function (initialState = {}) {
  const createStoreWithMiddleware = applyMiddleware(thunk, promiseMiddleware(), routerMiddleware(browserHistory))(createStore);
  return createStoreWithMiddleware(reducer, initialState);
}