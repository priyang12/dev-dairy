const express = require("express");
const auth = require("../middleware/auth");
const { NewPost } = require("../controllers/PostController");
const { validate } = require("../middleware/Validation");
const router = express.Router();

router.route("/").post(auth, NewPost);

module.exports = router;
