const express = require("express");
const router = express.Router();

// const auth = require("../middleware/auth");

const { registerUser, loginUser } = require("../controllers/UserController");
const { validate } = require("../middleware/Validation");

router.route("/register").post(validate("RegisterUser"), registerUser);
router.route("/login").post(validate("loginUser"), loginUser);

module.exports = router;
