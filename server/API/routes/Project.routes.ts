import { Router } from "express";
import {
  CreateProject,
  DeleteProject,
  GetProjectById,
  GetProjects,
  UpdateProject,
} from "../controllers/ProjectController";

import auth from "../middleware/auth";
import { ProjectValidator } from "../middleware/ProjectValidator";

export default (app: Router) => {
  app
    .route("/projects")
    .get(auth, GetProjects)
    .post(auth, ProjectValidator("CreateProject"), CreateProject);
  app
    .route("/projects/:id")
    .get(auth, GetProjectById)
    .put(auth, ProjectValidator("UpdateProject"), UpdateProject)
    .delete(auth, DeleteProject);
};
