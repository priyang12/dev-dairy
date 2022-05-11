import { Router } from "express";
import auth from "./routes/Auth.routes";
import agendash from "./routes/agenda.routes";

// guaranteed to get dependencies
export default () => {
  const app = Router();
  auth(app);
  agendash(app);
  return app;
};
