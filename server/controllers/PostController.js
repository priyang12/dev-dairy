const asyncHandler = require("express-async-handler");
const database = require("firebase-admin/database");
const { validationResult } = require("express-validator");

//Post Database
const PostRef = database.getDatabase().ref("posts");
//PostSchema
const PostSchema = require("../models/Post");

// @route    POST api/posts
// @desc     Create a post
// @access   Private
const NewPost = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    if (req?.user.uid) {
      const NewPost = new PostSchema({
        user: req.user.uid,
        name: req.user.name,
        text: req.body.text,
        title: req.body.title,
        likes: [],
        comments: [],
        date: Date.now(),
      });
      const post = await PostRef.push(NewPost);
      res.json({ msg: `${post.title} is Posted` });
    } else {
      res.status(500).send("Not Authorized");
    }
  } catch (err) {
    res.status(500).send(`Server Error ${err.message}`);
  }
});

// @route    GET api/Posts
// @desc     Get all posts
// @access   Private
const GetAllPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await PostRef.once("value");
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).send(`Server Error ${err.message}`);
  }
});

// @route    GET api/Posts/:id
// @desc     Get post by ID
// @access   Private
const GetPost = asyncHandler(async (req, res) => {
  try {
    const post = await PostRef.child(req.params.id).once("value");
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).send(`Server Error ${err.message}`);
  }
});

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
const DeletePost = asyncHandler(async (req, res) => {
  try {
    const post = await PostRef.child(req.params.id).once("value");

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check user
    if (post.user.toString() !== req.user.uid) {
      return res.status(401).json({ msg: "User not authorized", check: false });
    }
    await PostRef.child(req.params.id).remove();
    res.status(200).json({ msg: "Post removed" });
  } catch (err) {
    res.status(500).send(`Server Error ${err.message}`);
  }
});

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
const AddLike = asyncHandler(async (req, res) => {
  try {
    const post = await PostRef.child(req.params.id).once("value");
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    // Check if the post has already been liked
    if (post.likes.some((like) => like.user.toString() === req.user.uid)) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    // Add user id to likes array
    await post.likes.push({ user: req.user.uid });
    await PostRef.child(req.params.id).update({ likes: post.likes });
    res.status(200).json({ msg: "Post liked" });
  } catch (err) {
    res.status(500).send(`Server Error ${err.message}`);
  }
});

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a Put
// @access   Private
const UnlikePost = asyncHandler(async (req, res) => {
  try {
    const post = await PostRef.child(req.params.id).once("value");

    // Check if the post has not yet been liked
    if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    }

    // remove the like
    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );
    await PostRef.child(req.params.id).update({ likes: post.likes });
    res.status(200).json({ msg: "Post un-liked" });
  } catch (err) {
    res.status(500).send(`Server Error ${err.message}`);
  }
});

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
const AddComment = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const post = await PostRef.child(req.params.id).once("value");

    const newComment = {
      user: req.user.uid,
      text: req.body.text,
    };

    post.comments.unshift(newComment);

    await PostRef.child(req.params.id).update({ comments: post.comments });

    res.status(200).json({ msg: "Comment added", comments: post.comments });
  } catch (err) {
    res.status(500).send(`Server Error ${err.message}`);
  }
});

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
const DeleteComment = asyncHandler(async (req, res) => {
  try {
    const post = await PostRef.child(req.params.id).once("value");

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }
    post.comments = post.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await PostRef.child(req.params.id).update({ comments: post.comments });
    return res.json({ msg: "Comment removed", result: true });
  } catch (err) {
    res.status(500).send(`Server Error ${err.message}`);
  }
});

module.exports = {
  NewPost,
};
