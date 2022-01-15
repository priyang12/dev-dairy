const admin = require("firebase-admin");
const keys = require("./keys");
const serviceAccount = require("../../firebase.json");

const connectFirebase = async () => {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: keys.FireStoreDb,
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectFirebase;
