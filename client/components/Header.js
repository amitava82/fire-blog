/**
 * Created by amitava on 01/07/16.
 */
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router'

@connect(state => state)
export default class Header extends React.Component{
  
  render(){
    const {session: {isLoggedIn}} = this.props;
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">

          <div className="navbar-header">
            <a className="navbar-brand" href="/">Blog</a>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><Link to="/blogs">Blogs</Link></li>
              {isLoggedIn && <li><Link to="/blogs/create">Create</Link></li>}
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
                {isLoggedIn ? <a href="#" onClick={this.props.onLogout}>Logout</a> : <Link to="/login">Login</Link>}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}