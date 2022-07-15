import keys from "../config/keys";
import mongoose from "mongoose";
import { Db } from "mongodb";

export default async (): Promise<{ Db: Db; connection: typeof mongoose }> => {
  const URL =
    process.env.NODE_ENV === "production"
      ? (keys.mongoURL as string)
      : (keys.mongoDevURI as string);

  const connection = await mongoose.connect(URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  return { Db: connection.connection.db, connection: connection };
};
