import { Router } from "express";
import {
  CreatePost,
  DeletePost,
  GetPosts,
  GetProjectPosts,
  GetPost,
  UpdatePost,
} from "../controllers/PostController";

import auth from "../middleware/auth";

export default (app: Router) => {
  app.route("/posts").get(auth, GetPosts).post(auth, CreatePost);

  app
    .route("/posts/:id")
    .get(auth, GetPost)
    .put(auth, UpdatePost)
    .delete(auth, DeletePost);
  app.route("/posts/project/:id").get(auth, GetProjectPosts);
};
