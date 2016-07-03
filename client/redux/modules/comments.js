/**
 * Created by amitava on 03/07/16.
 */
import firebase from 'firebase';
import fb, {recordFromSnapshot} from '../../utils/firebase';
import createAction from '../createAction';

const [CREATE, LIST] = createAction('comments', ['CREATE', 'LIST']);


export function getComments(blogId, callback){

  return fb.firebaseDb.ref(`comments/${blogId}`).once('value').then(
    resp => {
      const comments = [];
      resp.forEach(i => {
        comments.push(i.val());
      });
      callback(null, comments);
    }
  );
}

export function addComment(blogId, name, comment){
  const commentRef = fb.firebaseDb.ref(`comments/${blogId}`).push();
  
  return commentRef.set({
    createdAt: firebase.database.ServerValue.TIMESTAMP,
    name,
    comment
  });
}