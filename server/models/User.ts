import { Schema, model, ObjectId } from "mongoose";
import type { Model, Document } from "mongoose";

export interface IUser extends Document {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  ImageUrl: string;
}

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
  date: {
    type: Date,
    default: Date.now,
  },
});
const User: Model<IUser> = model<IUser>("User", UserSchema);

export default User;
