import { Router } from "express";
import {
  GetSharedProject,
  ShareProject,
  DeleteSharedProject,
  GetProjectToken,
} from "../controllers/ShareProjectController";
import auth from "../middleware/auth";

export default (app: Router) => {
  app
    .route("/shareProject")
    .get(auth, GetSharedProject)
    .post(auth, ShareProject);

  app
    .route("/shareProject/:ProjectId")
    .get(auth, GetProjectToken)
    .delete(auth, DeleteSharedProject);
};
