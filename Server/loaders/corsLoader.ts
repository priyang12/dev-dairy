import express from "express";
import LoggerInstance from "./logger";
import cors, { CorsOptions } from "cors";

export default ({
  whiteList,
  app,
}: {
  whiteList: string[];
  app: express.Application;
}) => {
  const corsOptions: CorsOptions = {
    origin: whiteList,
    credentials: true,
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Accept",
      "Content-Type",
      "Authorization",
      "x-csrf-token",
      "*",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
  };

  LoggerInstance.info("Cors Init" + whiteList.join(","));
  app.use(cors(corsOptions));
  return app;
};
