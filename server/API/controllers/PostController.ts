import asyncHandler from "express-async-handler";

import { validationResult } from "express-validator";

import type { Request, Response } from "express";

import PostService from "../../services/PostService";
import Container from "typedi";

// @route   GET api/posts
// @desc    Fetch User Posts
// @access  Private
export const GetPostsWithPagination = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { page, limit } = req.query as any;
    const pageVal = Number(page) || 1;
    const projectServiceInstance = Container.get(PostService);
    const projects = await projectServiceInstance.GetPostsWithPagination(
      req.user._id,
      pageVal,
      parseInt(limit)
    );

    return res.status(200).json(projects);
  }
);

// @route   GET api/posts?
// @desc    Fetch User Projects
// @access  Private
export const GetPosts = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const projectServiceInstance = Container.get(PostService);
    const projects = await projectServiceInstance.GetAllPost(req.user._id);
    return res.status(200).json(projects);
  }
);

// @router GET api/posts/project/:id
// @desc Get project posts
// @access Private
export const GetProjectPosts = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const projectServiceInstance = Container.get(PostService);
    const project = await projectServiceInstance.GetAllPostByProject(
      req.params.id
    );
    return res.status(200).json(project);
  }
);

// @router GET api/posts/:id
// @desc Get project posts
// @access Private
export const GetPost = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const projectServiceInstance = Container.get(PostService);
    const project = await projectServiceInstance.GetPost(
      req.user._id,
      req.params.id
    );
    return res.status(200).json(project);
  }
);

// @router POST api/posts
// @desc Create Post
// @access Private
export const CreatePost = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    }
    const projectServiceInstance = Container.get(PostService);
    const message = await projectServiceInstance.CreatePost(
      req.user._id,
      req.body
    );
    return res.status(201).json(message);
  }
);

// @router PUT api/posts/:id
// @desc Update Post
// @access Private
export const UpdatePost = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const projectServiceInstance = Container.get(PostService);
    const message = await projectServiceInstance.UpdatePost(
      req.user._id,
      req.params.id,
      req.body
    );
    return res.status(200).json(message);
  }
);

// @router DELETE api/posts/:id
// @desc Delete Post
// @access Private
export const DeletePost = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const projectServiceInstance = Container.get(PostService);
    const message = await projectServiceInstance.DeletePost(
      req.user._id,
      req.params.id
    );
    return res.status(200).json(message);
  }
);
