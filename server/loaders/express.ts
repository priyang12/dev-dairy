import express from "express";
import cors from "cors";
import { errorHandler, notFound } from "../API/middleware/Error";
import routes from "../API/";
import config from "../config/keys";
import path from "path";
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

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  app.use(require("method-override")());

  // Transforms the raw string of req.body into json
  app.use(express.json());
  // Load API routes
  app.use(config.api.prefix, routes());

  //static for Browser
  const _dirname = path.resolve();
  let staticPath = "/client/build";

  if (process.env.NODE_ENV === "development") {
    staticPath = "../client/build";
  }
  if (
    process.env.NODE_ENV === "production" ||
    process.env.NODE_ENV === "development"
  ) {
    app.use(express.static(path.join(_dirname, staticPath)));

    app.get("*", (req, res) =>
      res.sendFile(path.resolve(_dirname, "client", "build", "index.html"))
    );
  } else {
    app.get("/", (req, res) => {
      res.send("API is running....");
    });
  }
  /// error handlers
  app.use(errorHandler);
  app.use(notFound);
};
