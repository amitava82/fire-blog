/**
 * Created by amitava on 01/07/16.
 */
import React from 'react';
import {Route, IndexRoute, IndexRedirect, Redirect} from 'react-router';


//import HomeContainer from './containers/home/HomeContainer';
import Blogs from './containers/blogs/Blogs';
import BlogsContainer from './containers/blogs/BlogsContainer';
import BlogsDetailsContainer from './containers/blogs/BlogDetails';
import BlogFormContainer from './containers/blogs/BlogForm';
import LoginContainer from './containers/login/LoginContainer';
import NotFound from './containers/misc/NotFound';

import App from './app';


export default (store) => {

  function ensureLoggedIn(nextState, replace, cb){
    const {session: {isLoggedIn, user}} = store.getState();
    if(!isLoggedIn){
      replace({pathname: '/blogs'});
    }
    cb();
  }

  return (
    <Route path="/" component={App}>
      <IndexRedirect to="/blogs"/>
      <Route path="/blogs" component={BlogsContainer}>
        <IndexRoute component={Blogs} />
        <Route path="create" component={BlogFormContainer} onEnter={ensureLoggedIn} />
        <Route path=":id" component={BlogsDetailsContainer} />
        <Route path=":id/edit" component={BlogFormContainer} onEnter={ensureLoggedIn} />
      </Route>
      <Route path="/login" component={LoginContainer} />
      <Route path="*" component={NotFound} />
    </Route>
  );
};