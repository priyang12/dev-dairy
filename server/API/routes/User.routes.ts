import { Router } from "express";
import { GetUser, UpdateUser, DeleteUser } from "../controllers/AuthController";

import auth from "../middleware/auth";

export default (app: Router) => {
  app
    .route("/user/me")
    .get(auth, GetUser)
    .put(auth, UpdateUser)
    .delete(auth, DeleteUser);
};
