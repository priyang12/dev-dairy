import { Router } from "express";
import AuthRoutes from "./routes/Auth.routes";
import UserRoutes from "./routes/User.routes";
import ProjectRoutes from "./routes/Project.routes";
import PostRoutes from "./routes/Post.routes";
import WorkSessions from "./routes/WorkSessions.routes";
import SharedProjectModel from "./routes/ShareProject.routes";
import SeedService from "./routes/SeedService.routes";

export default () => {
  const app = Router();
  AuthRoutes(app);
  UserRoutes(app);
  ProjectRoutes(app);
  PostRoutes(app);
  WorkSessions(app);
  SharedProjectModel(app);
  SeedService(app);
  return app;
};
