import { Router } from "express";
import {
  AddRoadMap,
  CreateProject,
  DeleteProject,
  DeleteRoadMap,
  EditRoadMap,
  GetProjectById,
  GetProjects,
  GetRoadMapProjectById,
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
    .get(auth, GetRoadMapProjectById)
    .put(auth, ProjectValidator("AddRoadMap"), AddRoadMap)
    .patch(auth, EditRoadMap)
    .delete(auth, DeleteRoadMap);
};
