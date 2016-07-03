/**
 * Created by amitava on 01/07/16.
 */
import firebase from 'firebase';
import {FIREBASE_CONFIG} from '../constants';

const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
const firebaseAuth = firebaseApp.auth();
const firebaseDb = firebaseApp.database();
const firebaseStore = firebaseApp.storage();

export default {
  firebaseApp,
  firebaseAuth,
  firebaseDb,
  firebaseStore,
  providers: {
    google: new firebase.auth.GoogleAuthProvider()
  }
}

export function recordFromSnapshot(snapshot) {
  const record = snapshot.val();
  if(!record) return record;
  record.key = snapshot.key;
  return record;
}
