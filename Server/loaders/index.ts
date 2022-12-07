import expressLoader from "./express";
import dependencyInjectorLoader from "./dependencyInjector";
import mongooseLoader from "./mongoose";
import Logger from "./logger";
import Tasks from "./Tasks";

export default async ({ expressApp }: any) => {
  await mongooseLoader();

  Logger.info("✌️ DB loaded and connected!");

  const userModel = {
    name: "userModel",
    model: require("../models/User").default,
  };
  const projectModel = {
    name: "projectModel",
    model: require("../models/Project").default,
  };
  const postModel = {
    name: "postModel",
    model: require("../models/Post").default,
  };
  const workSessionsModel = {
    name: "workSessionsModel",
    model: require("../models/WorkSessions").default,
  };
  const sharedProjectModel = {
    name: "sharedProjectModel",
    model: require("../models/ShareProject").default,
  };

  const TestUserModel = {
    name: "testUserModel",
    model: require("../models/TestUsers").default,
  };

  await dependencyInjectorLoader({
    models: [
      userModel,
      projectModel,
      postModel,
      workSessionsModel,
      sharedProjectModel,
      TestUserModel,
    ],
  });

  await Tasks();

  Logger.info("✌️ Dependency Injector loaded");

  await expressLoader({ app: expressApp });
  Logger.info("✌️ Express loaded");
};
