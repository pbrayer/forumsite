const router = require('express').Router();
const Post = require('../models/Post');
const appController = require('../controllers/appController');

// GET all posts in the runtime
router.get('/all', appController.getAll);

//Retrieve associated comments for a particular post
router.get("/comments", appController.comments);

// Signup for a username
router.post('/signup', appController.signup);

// Logout
router.post('/logout', appController.logout);

// POST an update
// Needs verification
router.post('/post', appController.generalValidation, appController.postUpdate);

// POST vote
// Needs verification
router.post('/vote', appController.checkVotes, appController.vote);

// POST comment
router.post('/comment', appController.comment);

module.exports = router;
