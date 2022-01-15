const express = require("express");
const { notFound, errorHandler } = require("./middleware/Error");
const connectFirebase = require("./config/firebase");

const app = express();

connectFirebase();

require("dotenv").config();

//init middleware
app.use(express.json({ extented: false }));

//define routes
app.use("/api/Users", require("./routes/UserRoute"));
app.use("/api/Posts", require("./routes/PostRoute"));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port${PORT}`));
