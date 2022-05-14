import { Router } from "express";
import User from "../../models/User";
import { registerUser, loginUser } from "../controllers/AuthController";
import validate from "../middleware/Validation";

export default (app: Router) => {
  app.route("/register").post(validate("RegisterUser"), registerUser);
  app.route("/login").post(validate("loginUser"), loginUser);
};
