import React from 'react';
import moment from 'moment';

const Post = ({ post, vote, index, showOnePost}) => {

  return (
    <div className="post">
      <div className="votes">
        <div className="upvote" onClick={() => vote(post._id, index, true)}>
          <span role="img" aria-label="up vote">
            ⬆️
          </span>
        </div>
        <div className="votecount">{post.votes}</div>
        <div className="downvote" onClick={() => vote(post._id, index, false)}>
          <span role="img" aria-label="down vote">
            ⬇️
          </span>
        </div>
      </div>

      <div className="content">
      <img style = {{resizeMode: "contain", height: 200, width:200, borderRadius: 100}} src= {post.pic}></img>
        <div className="title-area">
          <span className="title">{post.title}</span>
        </div>
        <div className="meta-area">
          <span className="time">
            Submitted {moment(post.posted).fromNow()} by
            <strong> {post.author}</strong>
          </span>
        </div>
        <div className="link-area" />
        <button id = {post._id} onClick = {showOnePost}>Comments</button>
      </div>
    </div>
  );
};

export default Post;
