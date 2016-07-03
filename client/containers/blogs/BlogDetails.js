/**
 * Created by amitava on 01/07/16.
 */
import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import autobind from 'autobind-decorator';

import {loadPost, deletePost} from '../../redux/modules/blogs';

import Blog from '../../components/Blog';

@connect(state => state)
export default class BlogDetailsContainer extends React.Component{

  componentWillMount(){
    const {dispatch, blogs: {entities}, params: {id}} = this.props;
    const blog = entities[id];
    if(!blog){
      dispatch(loadPost(id));
    }
  }

  @autobind
  onDelete(id){
    this.props.dispatch(deletePost(id));
    this.props.dispatch(push('/blogs'));

  }

  render(){
    const {blogs: {entities, ids}, params, users, session} = this.props;
    const blog = entities[params.id];

    if(!blog) return null;

    const user = users.entities[blog.owner] || {};
    blog.user = user;
    
    return (
      <div className="blog-container">
        <Blog blog={blog} user={session.user} onDelete={this.onDelete} />
        <div>
          
        </div>
      </div>
    )
  }
}