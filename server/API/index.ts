import { Router } from "express";
import auth from "./routes/Auth.routes";
import user from "./routes/User.routes";
import agendash from "./routes/agenda.routes";

// guaranteed to get dependenciess
export default () => {
  const app = Router();
  auth(app);
  user(app);
  agendash(app);
  return app;
};
