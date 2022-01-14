const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  registerUser,
  loginUser,
  GetUser,
} = require("../controllers/UserController");
const { validate } = require("../middleware/Validation");

router.route("/register").post(validate("RegisterUser"), registerUser);
router.route("/login").post(validate("loginUser"), loginUser);
router.route("/me").get(auth, GetUser);

module.exports = router;
