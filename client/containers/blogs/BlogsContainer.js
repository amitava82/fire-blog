/**
 * Created by amitava on 01/07/16.
 */
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import fireDecorator from '../../utils/firebaseDecorator';

@fireDecorator({
  subscribe: [
    {
      channel: props => `/blogs`,
      handler: (props, dispatch) => dispatch()
    }
  ]
})
export default class BlogsContainer extends React.Component{

  render(){
    return(
      <div className="blogs-container">
        {this.props.children}
      </div>
    )
  }
}