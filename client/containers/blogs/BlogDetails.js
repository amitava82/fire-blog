/**
 * Created by amitava on 01/07/16.
 */
import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import autobind from 'autobind-decorator';

import {loadPost, deletePost} from '../../redux/modules/blogs';
import {getComments, addComment} from '../../redux/modules/comments';

import Blog from '../../components/Blog';
import Comment from '../../components/Comment';
import Composer from '../../components/CommentComposer';

@connect(state => state)
export default class BlogDetailsContainer extends React.Component{

  constructor(...args){
    super(...args);
    this.state ={
      comments: [],
      commented: false
    }
  }

  componentWillMount(){
    const {dispatch, blogs: {entities}, params: {id}} = this.props;
    const blog = entities[id];
    if(!blog){
      dispatch(loadPost(id));
    }
    getComments(id, (err, comments) => {
      this.setState({comments});
    });
  }

  @autobind
  onDelete(id){
    this.props.dispatch(deletePost(id));
    this.props.dispatch(push('/blogs'));

  }

  @autobind
  addComment(name, comment){
    addComment(this.props.params.id, name, comment);
    this.setState({
      commented: true,
      comments: [...this.state.comments, {name, comment, createdAt: Date.now()}]
    });
  }

  render(){
    const {blogs: {entities, ids}, params, users, session} = this.props;
    const blog = entities[params.id];

    if(!blog) return null;

    const user = users.entities[blog.owner] || {};
    blog.user = user;
    const comments = this.state.comments.map( (i, idx) => <Comment comment={i} key={idx} />);
    
    return (
      <div className="blog-container">
        <Blog blog={blog} user={session.user} onDelete={this.onDelete} />
        {this.state.commented ? null : (
          <div>
            <h4>Post a comment</h4>
            <Composer onSubmit={this.addComment} />
          </div>
        )}
        <div className="comments">
          <h3>Comments</h3>
          {comments}
        </div>
      </div>
    )
  }
}