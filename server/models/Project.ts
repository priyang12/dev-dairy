import { Schema, model } from "mongoose";
import type { Model, Document } from "mongoose";

export interface IProject extends Document {
  user: string;
  title: string;
  description: string;
  technologies: string[];
  roadMap?: string[];
  process: string;
  live?: string;
  github?: string;
  date: Date;
}

const road = new Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
    default: "white",
  },
  progress: {
    type: Number,
    required: true,
    default: 0,
  },
  github: {
    type: String,
  },
});

// Create Schema
const ProjectSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  technologies: {
    type: [String],
    required: true,
  },
  roadMap: {
    type: [road],
  },
  process: {
    type: String,
    required: true,
    default: "in-progress",
  },
  live: {
    type: Boolean,
  },
  github: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Project: Model<IProject> = model<IProject>("project", ProjectSchema);

export default Project;
