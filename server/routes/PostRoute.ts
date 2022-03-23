import { Router } from "express";
import AuthMiddleware from "../middleware/auth";
import {
  NewPost,
  GetAllPosts,
  GetPost,
  DeletePost,
  AddLike,
  AddComment,
  UnlikePost,
  DeleteComment,
} from "../controllers/PostController";

// import validate from "../middleware/Validation";
const router = Router();
router
  .route("/")
  .post(AuthMiddleware, NewPost)
  .get(AuthMiddleware, GetAllPosts);

router
  .route("/:id")
  .get(AuthMiddleware, GetPost)
  .delete(AuthMiddleware, DeletePost);

router.route("/:id/like").put(AuthMiddleware, AddLike);
router.route("/:id/unlike").put(AuthMiddleware, UnlikePost);

router
  .route("/:id/comment/:id")
  .post(AuthMiddleware, AddComment)
  .delete(AuthMiddleware, DeleteComment);

export default router;
