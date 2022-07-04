import keys from "../config/keys";
import mongoose from "mongoose";
import { Db } from "mongodb";

export default async (): Promise<{ Db: Db; connection: typeof mongoose }> => {
  const connection = await mongoose.connect(
    "mongodb+srv://priyang:QV3vnWKyaMI442gk@cluster1.f9zvf.mongodb.net/Social?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  );
  return { Db: connection.connection.db, connection: connection };
};
