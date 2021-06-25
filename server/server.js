const express = require("express");
const connectDB = require("./config/db");

const app = express();

//connect Database
connectDB();

//init middleware
app.use(express.json({ extented: false }));

app.get("/", (req, res) => res.send("Express is Conntected "));

//define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/profile", require("./routes/profile"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port${PORT}`));
