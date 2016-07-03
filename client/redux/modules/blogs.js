/**
 * Created by amitava on 02/07/16.
 */
import Promise from 'bluebird';
import firebase from 'firebase';
import extend from 'lodash/extend';
import union from 'lodash/union';
import pull from 'lodash/pull';
import omit from 'lodash/omit';
import { resolve, reject as _reject } from '../middleware/promise';
import createAction from '../createAction';
import fb, {recordFromSnapshot} from '../../utils/firebase';
import {getUser} from './users';

const [CREATE, LIST, GET, DELETE, UPDATE] = createAction('blogs', ["CREATE", "LIST", "GET", "DELETE", "UPDATE"]);

const initialState = {
  ids: [],
  entities: {},
  loading: false,
  error: null
};

export default function reducer(state = initialState, action){
  const { type, payload } = action;

  switch (type){
    case CREATE:
    case LIST:
    case GET:
    case DELETE:
    case UPDATE:
      return extend({}, state, {
        loading: true,
        error: null
      });

    case _reject(LIST):
    case _reject(GET):
    case _reject(CREATE):
    case _reject(DELETE):
    case _reject(UPDATE):
      return extend({}, state, {
        loading: false,
        error: payload
      });

    case resolve(CREATE):
    case resolve(GET):
    case resolve(UPDATE):
      if(!payload) return state;
      return extend({}, state, {
        loading: false,
        error: null,
        ids: union(state.ids, [payload.key]),
        entities: extend({}, state.entities, {[payload.key]: payload})
      });

    case resolve(DELETE):
      return extend({}, state, {
        loading: false,
        error: null,
        ids: pull(state.ids, action.payload.key),
        entities: omit(state.entities, action.payload.key)
      });

    default:
      return state;

  }
}

export function createPost(title, content, tags) {
  return (dispatch, getState) => {
    dispatch({
      type: CREATE
    });
    
    const {user} = getState().session;
    return fb.firebaseDb.ref('blogs').push({
      owner: user.uid,
      title,
      content,
      tags,
      createdAt: firebase.database.ServerValue.TIMESTAMP
    }).catch(e =>{
      dispatch({
        type: _reject(CREATE),
        payload: e
      });
    });
  }
}

export function updatePost(id, title, content, tags) {
  return dispatch => {
    const ref = fb.firebaseDb.ref(`blogs/${id}`);
    return ref.update({
      title,
      content,
      tags
    });
  }
}

export function loadPost(id) {
  return dispatch => {
    const ref = fb.firebaseDb.ref(`blogs/${id}`);
    ref.once('value').then(
      snapshot => {
        const blog = recordFromSnapshot(snapshot);
        dispatch({
          type: resolve(GET),
          payload: blog
        });
        dispatch(getUser(blog.owner));
      }
    )
  }
}

export function deletePost(id) {
  return dispatch => {
    fb.firebaseDb.ref(`blogs/${id}`).remove().catch(e => {
      console.log(e)
    })
  }
}

export function blogListener(path) {
  return (dispatch, getState) => {
    const ref = fb.firebaseDb.ref(path);

    ref.on('child_added', snapshot => {
      var blog = recordFromSnapshot(snapshot);
      if(!blog) return;

      dispatch({
        type: resolve(CREATE),
        payload: blog
      });
      dispatch(getUser(blog.owner));
    });

    ref.on('child_changed', snapshot => dispatch({
      type: resolve(UPDATE),
      payload: recordFromSnapshot(snapshot)
    }));

    ref.on('child_removed', snapshot => {
      const data =recordFromSnapshot(snapshot);
      dispatch({
        type: resolve(DELETE),
        payload: data
      });
    });
  };
}