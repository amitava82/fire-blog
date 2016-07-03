/**
 * Created by amitava on 01/07/16.
 */
import React from 'react';
import {connect} from 'react-redux';
import autobind from 'autobind-decorator';
import {Link} from 'react-router';

import fireDecorator from '../../utils/firebaseDecorator';
import {blogListener, deletePost} from '../../redux/modules/blogs';
import Blog from '../../components/Blog';

@connect(state => state)
export default class Blogs extends React.Component{

  componentWillMount(){
    this.props.dispatch(blogListener('blogs'));
  }

  @autobind
  deletePost(id){
    this.props.dispatch(deletePost(id));
  }

  render(){
    const {blogs: {ids, entities}, users, session} = this.props;

    const blogItems = ids.map(i => {
      const blog = entities[i];
      const user = users.entities[blog.owner] || {};
      blog.user = user;
      return <Blog blog={blog} user={session.user} onDelete={this.deletePost} key={i} />
    });

    return(
      <div className="blogs-container">
        {blogItems}
      </div>
    )
  }
}