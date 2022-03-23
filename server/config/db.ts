import { connect } from "mongoose";
import keys from "./keys";

const db = keys.mongoURL;

const connectDB = async () => {
  try {
    await connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(" DB connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
