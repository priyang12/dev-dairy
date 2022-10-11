import { Schema, model } from "mongoose";
import type { Model } from "mongoose";
import {
  z,
  ProjectSchema as ZodProject,
  RoadMapSchema as ZodRoadMap,
} from "@dev-dairy/zodvalidation";

type withId<T> = T & { _id: string };

export type IProject = withId<z.infer<typeof ZodProject>>;

export type IRoadMap = withId<z.infer<typeof ZodRoadMap>>;

const road = new Schema<IRoadMap>({
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
const ProjectSchema = new Schema<IProject>({
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
