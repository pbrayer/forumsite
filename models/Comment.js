const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  body: {
    type: String,
    trim: true,
    maxlength: 300
  },
  author: {
    type: String,
    maxlength: 20,
    trim: true
  },
  pic: {
    type: String,
    maxlength: 100,
    trim:true
  },
  posted: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Comment', commentSchema);
