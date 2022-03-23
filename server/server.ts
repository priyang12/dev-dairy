import express, { Application } from "express";
import { errorHandler, notFound } from "./middleware/Error";
// const connectFirebase = require("./config/firebase");

const app: Application = express();

import PostRoute from "./routes/PostRoute";
// connectFirebase();
import dotenv from "dotenv";
dotenv.config();
// require("dotenv").config();

//init middleware
app.use(express.json());
app.use(notFound);
app.use(errorHandler);

//define routes
// app.use("/api/Users", require("./routes/UserRoute"));
app.use("/api/Posts", PostRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port${PORT}`));
