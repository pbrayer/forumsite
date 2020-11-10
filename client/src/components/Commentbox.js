import React from 'react';

const Commentbox = ({ newComment}) => {
  return (
    <div className="post-box">
      <h4>Post your comment below:</h4>
      <form className="post-form" action="" onSubmit={newComment}>
        <label htmlFor="pic">Picture Link (optional)</label>
        <input type="text" name="pic" maxLength="100"/>
        <label htmlFor="body">Message (required)</label>
        <textarea name="body" id="" cols="30" rows="10" maxLength="300" required/>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Commentbox;
