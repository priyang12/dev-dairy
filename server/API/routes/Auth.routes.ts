import { Router } from "express";
import { registerUser, loginUser } from "../controllers/AuthController";
import { LoginSchema, RegisterSchema } from "@dev-dairy/zodvalidation";
import ZodMiddleware from "../middleware/ZodMiddleware";

export default (app: Router) => {
  app.route("/register").post(ZodMiddleware(RegisterSchema), registerUser);
  app.route("/login").post(ZodMiddleware(LoginSchema), loginUser);
};
