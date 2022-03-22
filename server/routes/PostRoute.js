const express = require("express");
const auth = require("../middleware/auth");
const {
  NewPost,
  GetAllPosts,
  GetPost,
  DeletePost,
  AddLike,
  AddComment,
  UnlikePost,
  DeleteComment,
} = require("../controllers/PostController");
const { validate } = require("../middleware/Validation");
const router = express.Router();

router.route("/").post(auth, NewPost).get(auth, GetAllPosts);
router.route("/:id").get(auth, GetPost).delete(auth, DeletePost);

router.route("/:id/like").put(auth, AddLike);
router.route("/:id/unlike").put(auth, UnlikePost);

router
  .route("/:id/comment/:id")
  .post(auth, AddComment)
  .delete(auth, DeleteComment);

module.exports = router;
