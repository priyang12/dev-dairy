import express, { Application } from "express";
import { errorHandler, notFound } from "./API/middleware/Error";

import db from "./config/db";
import dotenv from "dotenv";

import PostRoute from "./API/routes/PostRoute.routes";
import UserRoute from "./API/routes/UserRoute.routes";

dotenv.config();

db();

const app: Application = express();

//init middleware
app.use(express.json());

//define routes
app.use("/api/test", (req, res) => {
  res.send("Test");
});
app.use("/api/Users", UserRoute);
app.use("/api/Posts", PostRoute);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port${PORT}`));
