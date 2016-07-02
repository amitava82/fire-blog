/**
 * Created by amitava on 01/07/16.
 */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

//import entities from './entities';
import errorMessage from './error';
import session from './session';

export default combineReducers({
  errorMessage,
  session,
  routing: routerReducer
});