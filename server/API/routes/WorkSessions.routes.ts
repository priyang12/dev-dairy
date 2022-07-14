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
  GetProjectWorkSessions,
  PullWorkSession,
} from "../controllers/WorkSessionsController";

import auth from "../middleware/auth";

export default (app: Router) => {
  app
    .route("/workSession")
    .get(auth, GetWorkSessions)
    .delete(auth, DeleteWorkSessions);

  app
    .route("/workSession/:id")
    .get(auth, GetWorkSession)
    .put(auth, UpdateWorkSession)
    .delete(auth, DeleteWorkSession);

  app.route("/workSession/:id/push").patch(auth, PushWorkSession);
  app.route("/workSession/:id/pull").patch(auth, PullWorkSession);

  app
    .route("/workSession/project/:projectId")
    .get(auth, GetProjectWorkSessions)
    .post(auth, CreateWorkSession)
    .delete(auth, DeleteWorkSessionsOfProject);
};
