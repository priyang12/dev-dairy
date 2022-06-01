import { Router } from "express";
import {
  AddRoadMap,
  CreateProject,
  DeleteProject,
  DeleteRoadMap,
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
    .put(auth, UpdateProject)
    .delete(auth, DeleteProject);
  app
    .route("/projects/:id/roadMap")
    .patch(auth, ProjectValidator("AddRoadMap"), AddRoadMap)
    .delete(auth, DeleteRoadMap);
};