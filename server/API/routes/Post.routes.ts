import {
  CreatePostValidation,
  PostSchema as ZodPostSchema,
} from "@dev-dairy/zodvalidation";
import { Router } from "express";
import {
  CreatePost,
  DeletePost,
  GetProjectPosts,
  GetPost,
  UpdatePost,
  GetPostsWithPagination,
} from "../controllers/PostController";

import auth from "../middleware/auth";
import ZodMiddleware from "../middleware/ZodMiddleware";

export default (app: Router) => {
  app
    .route("/posts")
    .get(auth, GetPostsWithPagination)
    .post(auth, ZodMiddleware(CreatePostValidation), CreatePost);

  app
    .route("/posts/:id")
    .get(auth, GetPost)
    .put(auth, ZodMiddleware(ZodPostSchema.partial()), UpdatePost)
    .delete(auth, DeletePost);

  app.route("/posts/project/:id").get(auth, GetProjectPosts);
};
