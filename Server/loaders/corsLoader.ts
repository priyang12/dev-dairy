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
    origin: function (origin, callback) {
      if (!origin || whiteList.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },

    credentials: true,
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Accept",
      "Content-Type",
      "Authorization",
      "x-csrf-token",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
  };

  LoggerInstance.info("Cors Init" + whiteList.join(","));
  app.use(cors(corsOptions));
  return app;
};
