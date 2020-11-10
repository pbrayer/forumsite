const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { db } = require('../models/Post');

// GET all posts

exports.getAll = async (req, res) => {
  try {
    const posts = await Post.find({}).populate("comments").limit(100).sort({ posted: -1 });
    res.send(posts);
  } catch (error) {res.json(err)}
};

exports.comments = async (req, res) => {
  try {
    const comments = await Comment.find({}).limit(100).sort({ posted: -1 });
    res.send(comments);
  } catch (error) {res.json(err)}
};

// GET one post

// exports.getOne = async (req, res) => {
//   try {
//     console.log("post", req.body.id);
//     const post = await Post.findOne({_id: req.body.id})
//     res.send(post);
//   } catch (error) {
//     console.log(error)
//   }
// };

// POST signup

exports.signup = (req, res) => {
  try {
    req.session.cookie.username = req.body.username;
    res.sendStatus(200);
  } catch (error) {
    console.log(error)
    // res.sendStatus(403);
  }
};

// POST logout

exports.logout = (req, res) => {
  try {
    req.session.destroy();
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(403);
  }
};

// POST an update to the database

exports.postUpdate = async (req, res) => {
  try {
    res.sendStatus(200);
    const post = new Post(req.body);
    await post.save();
  } catch (error) {
    console.log('Error in here!' + error.message);
    res.sendStatus(403);
  }
};

//COMMENT on a post
// Post.findOneAndUpdate(({}, { $push: { comments: comment._id } }, { new: true }));

// exports.comment = async (req, res) => {
//   try {
//     res.sendStatus(200);
//     // const comment = new Comment(req.body);
//     // await comment.save()
//     await Post.findOneAndUpdate(({_id: "5f84cfe2ef8ca55650d21bf0"}, { $push: { comments: req.body.pic } }, { new: true }))
//     // res.json(req.body);
//   } catch (error) {
//     console.log('Error in here!' + error.message);
//     res.sendStatus(403);
//   }
// };

// still need to actually create a comment in the db

// exports.comment = async (req, res) => {
//   try {
//     const comment = new Comment(req.body);
//     console.log(comment._id)
//     const commentInPost = await Post.findOneAndUpdate(
//         {_id: "5f84cfe2ef8ca55650d21bf0"},
//         {$push: { comments: comment._id }},
//         {new : true}
//     );
//     res.status(200).json(commentInPost);
//   } catch (error) {
//     console.log('Error in here! ' + error.message);
//     res.sendStatus(403);
//   }
//   };

//Async comment wasn't working so had to do it this way

exports.comment = (req, res) => {
  Comment.create(req.body)
   .then(function(dbComment){
    return Post.findOneAndUpdate({_id: req.body.id}, {$push: {comments: dbComment._id}}, {new: true})
    .then(function(dbPost){
      res.json(dbPost);
    })
}) .catch(function(err) {
  console.log('Error in here! ' + err.message);
  res.sendStatus(403);
});
};

// VOTE on the post

exports.vote = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate({ _id: req.body.id }, req.body, {
      new: true,
      runValidators: true
    });
    // res.sendStatus(200);
    res.json(req.body);
  } catch (error) {
    if (error) {
      console.log(error.message);
    }
    res.sendStatus(404);
  }
};

// Middleware for checking stuff

exports.generalValidation = async (req, res, next) => {
  // 1. check if the post/vote are not over the length
  if (
    req.body.title.length > 100 ||
    (req.body.body && req.body.body.length > 300) ||
    req.body.votes.length > 1
  ) {
    res.sendStatus(403);
    console.log('Over the limit error.');
    return;
  }
  // 2. pass some spam filter

  // 3. check if the post already exists
  try {
    const post = await Post.findOne({
      title: req.body.title,
      author: req.body.author
    });

    if (post) {
      // You already said that!
      res.sendStatus(403);
      console.log('Post already exists');
      return;
    }
  } catch (error) {
    return;
  }
  // Go next if there are no general errors
  next();
};

exports.checkVotes = (req, res, next) => {
  if (req.body.votes > 100 || req.body.vote < -100) {
    res.sendStatus(403);
    console.log('Un-natural number of votes');
    return;
  }
  next();
};
