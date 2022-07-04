import expressLoader from "./express";
import dependencyInjectorLoader from "./dependencyInjector";
import mongooseLoader from "./mongoose";
import Logger from "./logger";
// //We have to import at least all the events once so they can be triggered

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

  // It returns the agenda instance because it's needed in the subsequent loaders
  await dependencyInjectorLoader({
    mongoConnection,
    models: [userModel, projectModel, postModel],
  });

  Logger.info("✌️ Dependency Injector loaded");

  await expressLoader({ app: expressApp });
  Logger.info("✌️ Express loaded");
};
