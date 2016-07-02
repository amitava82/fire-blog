/**
 * Created by amitava on 01/07/16.
 */
import extend from 'lodash/extend';
import {push} from 'react-router-redux';
import firebase from '../../utils/firebase';

import createAction from '../createAction';

const [STORE_SESSION, DELETE_SESSION, LOGIN] = createAction('session', ["STORE_SESSION", "DELETE_SESSION", "LOGIN"]);

const initialState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null
};

export default function(state = initialState, action = {}){
  switch (action.type){
    case STORE_SESSION:
      return extend({}, state, {
        user: action.payload,
        isLoggedIn: true,
        loading: false,
        error: null
      });
    case DELETE_SESSION:
      return extend({}, state, {
        user: null,
        isLoggedIn: false,
        error: action.payload
      });

    default:
      return state;
  }
}

export function storeSession(session){
  return {
    type: STORE_SESSION,
    payload: session
  }
}

export function signOutSuccess() {
  return {
    type: DELETE_SESSION
  };
}

export function signup(email, password){
  return dispatch => {
    return firebase.firebaseAuth.createUserWithEmailAndPassword(email, password).then(
      user => {
        dispatch(storeSession(user));
        dispatch(push('/'));
      }
    );
  }
}

export function signin(email, password) {
  return dispatch => {
    return firebase.firebaseAuth.signInWithEmailAndPassword(email, password).then(
      user => {
        dispatch(storeSession(user));
        dispatch(push('/'));
      }
    );
  }
}

export function initAuth(){
  return (dispatch) => {
    var unsub = firebase.firebaseAuth.onAuthStateChanged(
      user => {
        if(user){
          dispatch(storeSession(user));
          dispatch(push('/'));
        }
        unsub();
      },
      e => dispatch(logout())
    );
  }
}

export function openOauthPopup() {
  return (dispatch) => {
    return firebase.firebaseAuth.signInWithPopup(firebase.providers.google).then(
      r => {
        dispatch(storeSession(r));
        dispatch(push('/blogs'));
      },
      error => dispatch(logout())
    )
  }

}

export function logout(){
  return (dispatch) => {
    firebase.firebaseAuth.signOut().then(
      r => {
        dispatch(signOutSuccess());
        dispatch(push('/'));
      }
    )
  }
}