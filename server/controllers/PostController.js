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
      const NewPost = new PostSchema(
        req.user.uid,
        req.body.text,
        req.body.title,
        [{ user: req.user.uid }],
        [],
        new Date().toISOString()
      );
      await PostRef.push(NewPost);

      res.json({ message: `${NewPost.title} is Posted` });
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
    var data = [];
    posts.forEach((ss) => {
      console.log(ss.toJSON());
      data.push(ss.val());
    });
    // console.log(data);
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
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).send(`Server Error ${err.message}`);
  }
});

// @route    DELETE api/Posts/:id
// @desc     Delete a post
// @access   Private
const DeletePost = asyncHandler(async (req, res) => {
  try {
    const post = await PostRef.child(req.params.id).once("value");

    if (!post.val()) {
      return res.status(404).json({ message: "Post not found" });
    }
    // Check user
    if (post.val().user.toString() !== req.user.uid) {
      return res
        .status(401)
        .json({ message: "User not authorized", check: false });
    }
    await PostRef.child(req.params.id).remove();
    res.status(200).json({ message: "Post removed" });
  } catch (err) {
    res.status(500).send(`Server Error ${err.message}`);
  }
});

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
const AddLike = asyncHandler(async (req, res) => {
  try {
    const postData = await PostRef.child(req.params.id).once("value");
    const post = postData.val();
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const alreadyLiked = post.likes.some(
      (like) => like.user.toString() === req.user.uid
    );
    // Check if the post has already been liked
    if (alreadyLiked)
      return res.status(404).json({ message: "Post already liked" });

    // Add user id to likes array
    await post.likes.push({ user: req.user.uid });
    await PostRef.child(req.params.id)
      .child("likes")
      .push({ user: req.user.uid });

    res.status(200).json({ message: "Post liked" });
  } catch (err) {
    throw Error(`Server Error ${err.message}`);
  }
});

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a Put
// @access   Private
const UnlikePost = asyncHandler(async (req, res) => {
  try {
    const postData = await PostRef.child(req.params.id).once("value");
    const post = postData.val();
    // Check if the post has not yet been liked
    const alreadyLiked = post.likes.some(
      (like) => like.user.toString() === req.user.uid
    );
    if (!alreadyLiked) {
      return res.status(404).json({ message: "Post has not yet been liked" });
    }

    // remove the like
    await PostRef.child(req.params.id)
      .child("likes")
      .child(req.user.uid)
      .remove();
    res.status(200).json({ message: `Like Removed from ${post.title}` });
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
    const postData = await PostRef.child(req.params.id).once("value");
    const post = postData.val();
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const newComment = {
      user: req.user.uid,
      text: req.body.text,
    };
    post.comments.unshift(newComment);
    await PostRef.child(req.params.id).update({ comments: post.comments });
    res.status(200).json({ message: "Comment added", comments: post.comments });
  } catch (err) {
    res.status(500).send(`Server Error ${err.message}`);
  }
});

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
const DeleteComment = asyncHandler(async (req, res) => {
  try {
    const postData = await PostRef.child(req.params.id).once("value");
    const post = postData.val();
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ message: "Comment does not exist" });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }
    post.comments = post.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );
    await PostRef.child(req.params.id).update({ comments: post.comments });
    return res.json({ message: "Comment removed", result: true });
  } catch (err) {
    res.status(500).send(`Server Error ${err.message}`);
  }
});

module.exports = {
  NewPost,
  GetAllPosts,
  GetPost,
  DeletePost,
  AddLike,
  UnlikePost,
  AddComment,
  DeleteComment,
};
