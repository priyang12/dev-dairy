import { Router } from "express";
import { GetUser, UpdateUser } from "../controllers/AuthController";

import auth from "../middleware/auth";

export default (app: Router) => {
  app.route("/User/me").get(GetUser).put(auth, UpdateUser);
};
