/**
 * Created by amitava on 03/07/16.
 */
import React from 'react';

export default function (props) {
  const comment = props.comment;
  const date = new Date(comment.createdAt).toDateString();
  return (
    <div className="comment">
      <p>
        <span>{comment.name}</span> <span className="pull-right">{date}</span>
      </p>
      <p>{comment.content}</p>
    </div>
  )
}