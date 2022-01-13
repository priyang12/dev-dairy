const express = require("express");
const { notFound, errorHandler } = require("./middleware/Error");
const connectFirebase = require("./config/firebase");
const keys = require("./config/keys");
const serviceAccount = require("../firebase.json");
const app = express();
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: keys.FireStoreDb,
});

console.log(admin.app.length);

require("dotenv").config();

//init middleware
app.use(express.json({ extented: false }));

//define routes
app.use("/api/Users", require("./routes/UserRoute"));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port${PORT}`));
