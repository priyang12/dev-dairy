import mongoose, { Schema, model } from "mongoose";
import type { Model, InferSchemaType } from "mongoose";

// Create Schema

const ShareProjectSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Project",
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  expirationTime: {
    type: Date,
    required: true,
  },
  JWTToken: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
export type ISharedProject = InferSchemaType<typeof ShareProjectSchema>;

const ShareProject: Model<ISharedProject> = model(
  "shareProject",
  ShareProjectSchema
);

export default ShareProject;
