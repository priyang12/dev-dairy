import { Schema, model } from "mongoose";
import type { Model, Document } from "mongoose";

export interface IProject extends Document {
  user: string;
  title: string;
  description: string;
  technologies: string[];
  roadMap?: IRoadMap[];
  process: string;
  live?: string;
  github?: string;
  date: Date;
}

export interface IRoadMap extends Document {
  name: string;
  color: string;
  progress: number;
  github?: string;
}

const road = new Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
    default: "#fff",
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
    type: Number,
    required: true,
    default: 1,
  },
  workSessions: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "WorkSessions",
      },
    ],
    required: true,
  },
  live: {
    type: Boolean,
  },
  website: {
    type: String,
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
