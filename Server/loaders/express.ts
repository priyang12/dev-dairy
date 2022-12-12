import express from "express";
import { errorHandler, notFound } from "../API/middleware/Error";
import routes from "../API/";
import config from "../config/keys";
import cookieParser from "cookie-parser";

export default ({ app }: { app: express.Application }) => {
  /**
   * Health Check endpoints
   * @TODO Explain why they are here
   */
  app.get("/status", (req, res) => {
    res.status(200).end();
  });
  app.head("/status", (req, res) => {
    res.status(200).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable("trust proxy");

  app.use(require("method-override")());

  // Transforms the raw string of req.body into json
  app.use(express.json());

  app.use(cookieParser());

  // Load API routes
  app.use(config.api.prefix, routes());

  app.get("/", (req, res) => {
    res.send("API is running....");
  });

  /// error handlers
  app.use(errorHandler);
  app.use(notFound);
};
