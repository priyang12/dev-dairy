import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";
import PostService from "../../services/PostService";
import Container from "typedi";
import NodeCache from "node-cache";
import { GetParams } from "../../utils/GetParams";

const PostCache = new NodeCache({ stdTTL: 600 });

// @route   GET api/posts
// @desc    Fetch User Posts
// @access  Private
export const GetPostsWithPagination = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { page, limit, select, sort, filter } = GetParams(req.query, {
      sort: {
        date: -1,
      },
      page: 1,
      limit: 10,
    });
    const CacheKey = `${page} + ${limit} + ${select} + ${JSON.stringify(
      sort
    )} + ${JSON.stringify(filter)}`;

    if (PostCache.get(CacheKey)) {
      return res.status(200).json(PostCache.get(CacheKey));
    } else {
      const projectServiceInstance = Container.get(PostService);
      const projects = await projectServiceInstance.GetPostsWithPagination(
        req.user._id,
        page,
        limit,
        select,
        req.query.ProjectSelect as string,
        sort,
        filter
      );
      PostCache.set(CacheKey, projects, 3600 / 2);
      return res.status(200).json(projects);
    }
  }
);

// @router GET api/posts/project/:id
// @desc Get project posts
// @access Private
export const GetProjectPosts = asyncHandler(
  async (req: Request, res: Response) => {
    const projectServiceInstance = Container.get(PostService);
    const project = await projectServiceInstance.GetAllPostByProject(
      req.params.id
    );
    res.status(200).json(project);
  }
);

// @router GET api/posts/:id
// @desc Get project posts
// @access Private
export const GetPost = asyncHandler(async (req: Request, res: Response) => {
  const projectServiceInstance = Container.get(PostService);
  const project = await projectServiceInstance.GetPost(
    req.user._id,
    req.params.id
  );
  res.status(200).json(project);
});

// @router POST api/posts
// @desc Create Post
// @access Private
export const CreatePost = asyncHandler(async (req: Request, res: Response) => {
  const projectServiceInstance = Container.get(PostService);
  const message = await projectServiceInstance.CreatePost(
    req.user._id,
    req.body
  );
  PostCache.flushAll();
  res.status(201).json(message);
});

// @router PUT api/posts/:id
// @desc Update Post
// @access Private
export const UpdatePost = asyncHandler(async (req: Request, res: Response) => {
  const projectServiceInstance = Container.get(PostService);
  const message = await projectServiceInstance.UpdatePost(
    req.user._id,
    req.params.id,
    req.body
  );
  PostCache.flushAll();
  res.status(200).json(message);
});

// @router DELETE api/posts/:id
// @desc Delete Post
// @access Private
export const DeletePost = asyncHandler(async (req: Request, res: Response) => {
  const projectServiceInstance = Container.get(PostService);
  const message = await projectServiceInstance.DeletePost(
    req.user._id,
    req.params.id
  );
  PostCache.flushAll();
  res.status(200).json(message);
});
