import { Router } from "express";
import {
  registerUser,
  loginUser,
  GetUser,
  UpdateUser,
} from "../controllers/UserController";
import validate from "../middleware/Validation";
import auth from "../middleware/auth";
import Container from "typedi";

export default (app: Router) => {
  const agendaInstance = Container.get("agendaInstance");

  app.route("/register").post(validate("RegisterUser"), registerUser);
  app.route("/login").post(validate("loginUser"), loginUser);
  app.route("/me").get(GetUser).put(auth, UpdateUser);
};
