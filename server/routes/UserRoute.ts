import { Router } from "express";
// import {
//   registerUser,
//   loginUser,
//   GetUser,
// } from "../controllers/UserController";
import validate from "../middleware/Validation";
import auth from "../middleware/auth";

const router: Router = Router();
// router.route("/register").post(validate("RegisterUser"), registerUser);
// router.route("/login").post(validate("loginUser"), loginUser);
// router.route("/me").get(auth, GetUser);

export default router;
