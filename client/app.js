/**
 * Created by amitava on 01/07/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import Helmet from 'react-helmet';
import { initAuth, logout} from './redux/modules/session';

import Header from './components/Header';

import '../scss/export.scss';

@connect(state => state)
export default class App extends React.Component {

  componentWillMount(){
    this.props.dispatch(initAuth());
  }

  @autobind
  logout(){
    this.props.dispatch(logout());
  }

  render(){
    return (
      <div id="main">
        <Helmet title="FireBlog" />
        <Header onLogout={this.logout} />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}