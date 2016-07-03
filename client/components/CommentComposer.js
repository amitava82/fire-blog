/**
 * Created by amitava on 03/07/16.
 */
import React from 'react';
import autobind from 'autobind-decorator';

export default class CommentComposer extends React.Component{

  @autobind
  submit(e){
    e.preventDefault();
    const name = this.refs.name.value;
    const comment = this.refs.comment.value;
    
    this.props.onSubmit(name, comment);
  }

  render(){
    return (
      <div className="componser">
        <form onSubmit={this.submit}>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Your name" ref="name"/>
          </div>
          <div className="form-group">
            <textarea className="form-control" ref="comment" placeholder="Enter comments here"></textarea>
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }

}