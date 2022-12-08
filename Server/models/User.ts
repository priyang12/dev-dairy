import { Schema, model } from "mongoose";
import type { Model, InferSchemaType } from "mongoose";

// Create Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  ImageUrl: {
    type: String,
  },
  GlobalAlert: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export type IUser = InferSchemaType<typeof UserSchema>;

const User: Model<IUser> = model<IUser>("User", UserSchema);

export type UserModelType = Model<IUser>;

export default User;
