import { Router } from "express";
import {
  registerUser,
  loginUser,
  GetUser,
  UpdateUser,
} from "../controllers/AuthController";
import validate from "../middleware/Validation";
import auth from "../middleware/auth";

export default (app: Router) => {
  app.route("/register").post(validate("RegisterUser"), registerUser);
  app.route("/login").post(validate("loginUser"), loginUser);
  app.route("/User/me").get(GetUser).put(auth, UpdateUser);
};
