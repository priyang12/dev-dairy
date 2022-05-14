import { Router } from "express";
import AuthRoutes from "./routes/Auth.routes";
import UserRoutes from "./routes/User.routes";
import agendas from "./routes/agenda.routes";
import ProjectRoutes from "./routes/Project.routes";

export default () => {
  const app = Router();
  AuthRoutes(app);
  UserRoutes(app);
  ProjectRoutes(app);
  agendas(app);
  return app;
};
