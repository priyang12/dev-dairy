const express = require("express");
const connectDB = require("./config/db");
const morgan = require("morgan");
const path = require("path");
const app = express();

require("dotenv").config();
//connect Database
connectDB();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//init middleware
app.use(express.json({ extented: false }));

//define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/PhotoUpload", require("./routes/upload"));

//static for Browser
const _dirname = path.resolve();

app.use("/Photos", express.static(path.join(__dirname, "/Photos")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(_dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port${PORT}`));
