/**
 * Created by amitava on 01/07/16.
 */
import React from 'react';
import {Route, IndexRoute, IndexRedirect, Redirect} from 'react-router';


import HomeContainer from './containers/home/HomeContainer';
import BlogsContainer from './containers/blogs/BlogsContainer';
import BlogsDetailsContainer from './containers/blogs/BlogDetailsContainer';
import BlogFormContainer from './containers/blogs/BlogFormContainer';
import LoginContainer from './containers/login/LoginContainer';
import NotFound from './containers/misc/NotFound';

import App from './app';


export default (store) => {

  function ensureLoggedIn(nextState, replace, cb){
    const {session: {isLoggedIn, user}} = store.getState();
    if(!isLoggedIn){
      replace({pathname: '/home'});
    }
    cb();
  }

  return (
    <Route path="/" component={App}>
      <IndexRedirect to="/home"/>
      <Route path="/home" component={HomeContainer} />
      <Route path="/blogs" component={BlogsContainer} />
      <Route path="/blogs/:id" component={BlogsDetailsContainer} />
      <Route path="/blogs/:id/edit" component={BlogFormContainer} />
      <Route path="/login" component={LoginContainer} />
      <Route path="*" component={NotFound} />
    </Route>
  );
};