import admin from "firebase-admin";
import keys from "./keys";

const serviceAccount = require("../../firebase.json");

const connectFirebase = async () => {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: keys.FireStoreDb,
    });
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectFirebase;
