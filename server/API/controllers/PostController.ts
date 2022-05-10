import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
//PostSchema
import PostModal from "../../models/Post";

// @route    POST api/posts
// @desc     Create a post
// @access   Private
export const NewPost = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const Post = new PostModal({
      user: req.user._id,
      title: req.body.title,
      description: req.body.description,
      name: req.body.name,
    });
    await Post.save();
    res.status(200).json({
      success: true,
      data: {
        msg: `${Post.title} created successfully`,
      },
    });
  }
);

// @route    GET api/Posts/:id
// @desc     Get post by ID
// @access   Private
export const GetPost = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const post = await PostModal.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    } else {
      res.status(200).json({
        success: true,
        data: post,
      });
    }
  }
);

// @route    GET api/Posts
// @desc     Get all posts
// @access   Private
export const GetAllPosts = asyncHandler(async (req: Request, res: Response) => {
  const posts = await PostModal.find().sort({ date: -1 });
  res.status(200).json({
    success: true,
    count: posts.length,
    data: posts,
  });
});

// @route    DELETE api/Posts/:id
// @desc     Delete a post
// @access   Private
export const DeletePost = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const post = await PostModal.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }

    await post.remove();

    res.status(200).json({
      success: true,
      data: {
        msg: "Post has been removed",
      },
    });
  }
);

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
export const AddLike = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const post = await PostModal.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }

    if (
      post.likes.filter((like) => like.user.toString() === req.user._id)
        .length > 0
    ) {
      return res.status(400).json({
        success: false,
        error: "Post already liked",
      });
    }

    post.likes.unshift({ user: req.user._id });

    await post.save();

    res.status(200).json({
      success: true,
      data: post,
    });
  }
);

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a Put
// @access   Private
export const UnlikePost = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const post = await PostModal.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }

    if (
      post.likes.filter((like) => like.user.toString() === req.user._id)
        .length === 0
    ) {
      return res.status(400).json({
        success: false,
        error: "Post has not yet been liked",
      });
    }

    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user._id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.status(200).json({
      success: true,
      data: post,
    });
  }
);

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
export const AddComment = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const post = await PostModal.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }

    const newComment = {
      text: req.body.text,
      name: req.body.name,
      user: req.user._id,
    };

    post.comments.unshift(newComment);

    await post.save();

    res.status(200).json({
      success: true,
      data: post,
    });
  }
);

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
export const DeleteComment = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const post = await PostModal.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }

    const comment = post.comments.find(
      (comment) => comment.user === req.params.comment_id
    );

    if (!comment) {
      return res.status(404).json({
        success: false,
        error: "Comment not found",
      });
    }

    if (comment.user.toString() !== req.user._id) {
      return res.status(401).json({
        success: false,
        error: "User not authorized",
      });
    }

    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user._id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.status(200).json({
      success: true,
      data: post,
    });
  }
);
