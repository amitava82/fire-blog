/**
 * Created by amitava on 02/07/16.
 */
import React from 'react';
import {Link} from 'react-router';
import map from 'lodash/map';

export default function (props) {
  const blog = props.blog;
  const prettyDate = new Date(blog.createdAt).toDateString();
  const tags = map(blog.tags, (tag => <span className="label label-default" key={tag}>{tag}</span>));
  const isOwner = blog.owner === props.user && props.user.uid;
  return (
    <div className="blog">
      <h1 className="blog-title"><Link to={`/blogs/${blog.key}`}>{blog.title}</Link></h1>
      <p className="blog-meta">{prettyDate} by {blog.user.name}</p>
      {isOwner && 
        (<p>
          <Link className="btn btn-link" to={`/blogs/${blog.key}/edit`}>Edit</Link>
          <button onClick={e => props.onDelete(blog.key)} className="btn btn-link">Delete</button>
        </p>)
      }
      <p>
        {blog.content}
      </p>
      <p className="blog-tags lead">{tags}</p>
    </div>
  )
}