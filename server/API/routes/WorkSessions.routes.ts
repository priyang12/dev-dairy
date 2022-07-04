import { Router } from "express";
import {
  GetWorkSession,
  GetWorkSessions,
  CreateWorkSession,
  PushWorkSession,
  UpdateWorkSession,
  DeleteWorkSession,
  DeleteWorkSessions,
  DeleteWorkSessionsOfProject,
} from "../controllers/WorkSessions";

import auth from "../middleware/auth";

export default (app: Router) => {
  app
    .route("/workSession")
    .get(auth, GetWorkSessions)
    .post(auth, CreateWorkSession)
    .delete(auth, DeleteWorkSessions);

  app
    .route("/workSession/:id")
    .get(auth, GetWorkSession)
    .put(auth, UpdateWorkSession)
    .delete(auth, DeleteWorkSession);

  app.route("/workSession/:id/push").post(auth, PushWorkSession);
  app
    .route("/workSession/project/:projectId")
    .delete(auth, DeleteWorkSessionsOfProject);
};
