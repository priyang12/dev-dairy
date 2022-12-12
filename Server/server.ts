import "reflect-metadata";

import keys from "./config/keys";

import express from "express";

import Logger from "./loaders/logger";

async function startServer() {
  const app = express();
  await require("./loaders").default({ expressApp: app });
  app
    .listen(5001, () => {
      Logger.info(`Server listening on port: ${keys.Port}`);
    })
    .on("error", (err) => {
      Logger.error(err);
      process.exit(1);
    });
}

export default startServer;
