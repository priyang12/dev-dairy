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
    const CacheKey = `${
      req.user._id
    } + ${page} + ${limit} + ${select} + ${JSON.stringify(
      sort
    )} + ${JSON.stringify(filter)}`;

    if (PostCache.get(CacheKey)) {
      console.log("from cache");

      return res.status(200).json(PostCache.get(CacheKey));
    } else {
      const PostServiceInstance = Container.get(PostService);
      const Posts = await PostServiceInstance.GetPostsWithPagination(
        req.user._id,
        page,
        limit,
        select,
        req.query.ProjectSelect as string,
        sort,
        filter
      );
      PostCache.set(CacheKey, Posts, 3600 / 2);
      return res.status(200).json(Posts);
    }
  }
);

// @router GET api/posts/project/:id
// @desc Get project posts
// @access Private
export const GetProjectPosts = asyncHandler(
  async (req: Request, res: Response) => {
    const PostServiceInstance = Container.get(PostService);
    const Res = await PostServiceInstance.GetAllPostByProject(req.params.id);
    res.status(200).json(Res);
  }
);

// @router GET api/posts/:id
// @desc Get project posts
// @access Private
export const GetPost = asyncHandler(async (req: Request, res: Response) => {
  const PostServiceInstance = Container.get(PostService);
  const Res = await PostServiceInstance.GetPost(req.user._id, req.params.id);
  res.status(200).json(Res);
});

// @router POST api/posts
// @desc Create Post
// @access Private
export const CreatePost = asyncHandler(async (req: Request, res: Response) => {
  const PostServiceInstance = Container.get(PostService);
  const message = await PostServiceInstance.CreatePost(req.user._id, req.body);
  PostCache.flushAll();
  res.status(201).json(message);
});

// @router PUT api/posts/:id
// @desc Update Post
// @access Private
export const UpdatePost = asyncHandler(async (req: Request, res: Response) => {
  const PostServiceInstance = Container.get(PostService);
  const message = await PostServiceInstance.UpdatePost(
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
  const PostServiceInstance = Container.get(PostService);
  const message = await PostServiceInstance.DeletePost(
    req.user._id,
    req.params.id
  );
  PostCache.flushAll();
  res.status(200).json(message);
});
