import { Router } from "express";
import {
  GetSharedProject,
  ShareProject,
  DeleteSharedProject,
} from "../controllers/ShareProjectController";
import auth from "../middleware/auth";

export default (app: Router) => {
  app
    .route("/shareProject")
    .post(auth, ShareProject)
    .get(auth, GetSharedProject);

  app.route("/shareProject/:ProjectId").delete(auth, DeleteSharedProject);
};
