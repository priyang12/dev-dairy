import { ProjectSchema, RoadMapSchema } from "@dev-dairy/zodvalidation";
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
import ZodMiddleware from "../middleware/ZodMiddleware";

export default (app: Router) => {
  app
    .route("/projects")
    .get(auth, GetProjects)
    .post(
      auth,
      ZodMiddleware(
        ProjectSchema.omit({
          user: true,
        })
      ),
      CreateProject
    );
  app
    .route("/projects/:id")
    .get(auth, GetProjectById)
    .put(auth, ZodMiddleware(ProjectSchema.partial()), UpdateProject)
    .delete(auth, DeleteProject);
  app
    .route("/projects/:id/roadMap")
    .get(auth, GetRoadMapProjectById)
    .put(auth, ZodMiddleware(RoadMapSchema), AddRoadMap)
    .patch(auth, ZodMiddleware(RoadMapSchema.partial()), EditRoadMap)
    .delete(auth, DeleteRoadMap);
};
