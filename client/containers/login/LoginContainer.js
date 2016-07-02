/**
 * Created by amitava on 01/07/16.
 */
import React from 'react';
import {connect} from 'react-redux';
import autobind from 'autobind-decorator';

import {openOauthPopup, signup, signin} from '../../redux/modules/session';

@connect(state => state)
export default class LoginContainer extends React.Component{

  @autobind
  initOauth(){
    this.props.dispatch(openOauthPopup());
  }

  @autobind
  login(e){
    e.preventDefault();
    const email = this.refs.l_email.value;
    const password = this.refs.l_password.value;
    const p = this.props.dispatch(signin(email, password)).catch(
      e => alert(e)
    );
  }

  @autobind
  signup(e){
    e.preventDefault();
    const email = this.refs.s_email.value;
    const password = this.refs.s_password.value;
    const p = this.props.dispatch(signup(email, password)).catch(
      e => alert(e)
    );
  }
  
  render(){
    return(
      <div className="login-container">
        <div className="row">
          <form className="col-md-4" onSubmit={this.login}>
            <h3>Login</h3>
            <div className="form-group">
              <label className="control-label">Email Address</label>
              <input type="text" className="form-control" ref="l_email"/>
            </div>
            <div className="form-group">
              <label className="control-label">Password</label>
              <input type="password" className="form-control" ref="l_password" />
            </div>
            <button className="btn btn-primary">Login</button>
            <button type="button" onClick={this.initOauth} className="btn btn-danger pull-right">Login with Google</button>
          </form>
          <div className="col-md-4 text-center">
            <div className="choice-sep">
              or
            </div>
          </div>
          <form className="col-md-4" onSubmit={this.signup}>
            <h3>Signup</h3>
            <div className="form-group">
              <label className="control-label">Email Address</label>
              <input type="text" className="form-control" ref="s_email"/>
            </div>
            <div className="form-group">
              <label className="control-label">Password</label>
              <input type="password" className="form-control" ref="s_password"/>
            </div>
            <button className="btn btn-primary">Signup</button>
          </form>
        </div>
      </div>
    )
  }
}