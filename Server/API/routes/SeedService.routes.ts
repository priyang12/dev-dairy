import { Router } from "express";
import {
  SeedUser,
  DeleteUsers,
  GetTestUser,
} from "../controllers/SeedServiceController";

export default (app: Router) => {
  app.route("/seed").post(SeedUser).delete(DeleteUsers).get(GetTestUser);
};
