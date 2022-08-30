import { Router } from "express";
import {
  CreatePost,
  DeletePost,
  GetPosts,
  GetProjectPosts,
  GetPost,
  UpdatePost,
  GetPostsWithPagination,
  GetPostsWithFilter,
} from "../controllers/PostController";

import auth from "../middleware/auth";

export default (app: Router) => {
  app.route("/posts").get(auth, GetPostsWithPagination).post(auth, CreatePost);
  app.route("/posts/filter").get(auth, GetPostsWithFilter);
  app.route("/posts/all").get(auth, GetPosts);

  app
    .route("/posts/:id")
    .get(auth, GetPost)
    .put(auth, UpdatePost)
    .delete(auth, DeletePost);

  app.route("/posts/project/:id").get(auth, GetProjectPosts);
};
