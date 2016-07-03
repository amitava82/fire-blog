/**
 * Created by amitava on 02/07/16.
 */

import firebase from 'firebase';
import extend from 'lodash/extend';
import union from 'lodash/union';
import pull from 'lodash/pull';
import omit from 'lodash/omit';
import { resolve, reject as _reject } from '../middleware/promise';
import createAction from '../createAction';
import fb, {recordFromSnapshot} from '../../utils/firebase';

const [CREATE, LIST, GET, DELETE, UPDATE] = createAction('users', ["CREATE", "LIST", "GET", "DELETE", "UPDATE"]);

const initialState = {
  ids: [],
  entities: {}
};

export default function reducer(state = initialState, action = {}){
  const { type, payload } = action;

  switch (type){
    case resolve(CREATE):
      break;

    case resolve(GET):
      return extend({}, state, {
        ids: union(state.ids, [payload.key]),
        entities: extend({}, state.entities, {[payload.key]: payload})
      });

    default:
      return state;
  }
}

export function saveUser(user, callback) {
  const usersRef = fb.firebaseDb.ref(`users/${user.uid}`);
  usersRef.transaction(function(current){
    if(!current){
      return user;
    }

  }, function(err, commited, snapshot){
    const val = snapshot.val();
    callback && callback(val);
  });
}

export function getUser(id) {
  return dispatch => {
    fb.firebaseDb.ref(`users/${id}`).once('value', val => {
      dispatch({
        type: resolve(GET),
        payload: recordFromSnapshot(val)
      })
    })
  }
}