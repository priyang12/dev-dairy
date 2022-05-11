import { Router } from "express";
import auth from "./routes/UserRoute.routes";
import agendash from "./routes/agenda.routes";

// guaranteed to get dependencies
export default () => {
  const app = Router();
  auth(app);
  agendash(app);
  return app;
};
