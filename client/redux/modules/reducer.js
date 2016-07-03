/**
 * Created by amitava on 01/07/16.
 */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

//import entities from './entities';
import errorMessage from './error';
import session from './session';
import blogs from './blogs';
import users from './users';

export default combineReducers({
  errorMessage,
  session,
  blogs,
  users,
  routing: routerReducer
});