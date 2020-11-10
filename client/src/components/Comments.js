import React from 'react';
import moment from 'moment';

const Comments = ({comments}) => {

  return (
    <div className="post">
      <div className="content">
      <img style = {{resizeMode: "contain", height: 200, width:200, borderRadius: 100}} src= {comments.pic}></img>
        <div className="title-area">
          <span className="title">{comments.body}</span>
        </div>
        <div className="meta-area">
          <span className="time">
            Submitted {moment(comments.posted).fromNow()} by
            <strong> {comments.author}</strong>
          </span>
        </div>
    </div>
    </div>
  );
};

export default Comments;