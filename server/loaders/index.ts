import expressLoader from "./express";
import dependencyInjectorLoader from "./dependencyInjector";
import mongooseLoader from "./mongoose";
import Logger from "./logger";

export default async ({ expressApp }: any) => {
  const { Db: mongoConnection } = await mongooseLoader();

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

  await dependencyInjectorLoader({
    mongoConnection,
    models: [
      userModel,
      projectModel,
      postModel,
      workSessionsModel,
      sharedProjectModel,
    ],
  });

  Logger.info("✌️ Dependency Injector loaded");

  await expressLoader({ app: expressApp });
  Logger.info("✌️ Express loaded");
};
