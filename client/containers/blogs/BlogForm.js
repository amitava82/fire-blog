/**
 * Created by amitava on 01/07/16.
 */
import React from 'react';
import autobind from 'autobind-decorator';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import {createPost, updatePost} from '../../redux/modules/blogs';

@connect(state => state)
export default class BlogFormContainer extends React.Component{

  constructor(...args){
    super(...args);
    this.state = {
      title: '',
      tags: '',
      content: '',
      initialized: false
    }
  }

  componentDidMount(){
    const {params: {id}, blogs: {entities}} = this.props;
    if(id){
      const nextBlog = entities[id];
      if(!nextBlog || this.state.initialized) return;

      this.setState({
        title: nextBlog.title,
        content: nextBlog.content,
        tags: nextBlog.tags && nextBlog.tags.join(',')
        , initialized: true});
    }
  }

  @autobind
  create(e){
    e.preventDefault();
    const {dispatch, params: {id}} = this.props;
    const {title, content, tags} = this.state;
    const tagsArr = tags && tags.split(',').map(i => i.trim()) || [];

    if(id){
      dispatch(updatePost(id, title, content, tagsArr)).then(
        r => {
          dispatch(push('/blogs'));
        }
      )
    }else{
      dispatch(createPost(title, content, tagsArr)).then(
        r => {
          dispatch(push('/blogs'));
        }
      )
    }
  }

  @autobind
  onChange(e){
    const name = e.target.name;
    const val = e.target.value;

    this.setState({
      [name]: val
    });

  }

  render(){

    const {title, content, tags} = this.state;

    return(
      <div className="blog-continer">
        <h1></h1>
        <form onSubmit={this.create}>
          <div className="form-group">
            <label className="control-label">Post title</label>
            <input type="text" name="title" value={title} onChange={this.onChange} className="form-control input-lg"/>
          </div>
          <div className="form-group">
            <label className="control-label">Post title</label>
            <textarea rows="10" name="content" value={content} onChange={this.onChange} className="form-control" />
          </div>
          <div className="form-group">
            <label className="control-label">Tags</label>
            <input type="text" name="tags" value={tags} onChange={this.onChange} className="form-control input-lg" placeholder="comma separated tags"/>
          </div>
          <button className="btn btn-lg btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}