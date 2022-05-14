import { Router } from "express";
import AuthRoutes from "./routes/Auth.routes";
import UserRoutes from "./routes/User.routes";
import ProjectRoutes from "./routes/Project.routes";
import PostRoutes from "./routes/Post.routes";
import agendas from "./routes/agenda.routes";

export default () => {
  const app = Router();
  AuthRoutes(app);
  UserRoutes(app);
  ProjectRoutes(app);
  PostRoutes(app);
  agendas(app);
  return app;
};
