import { Schema, model } from "mongoose";
import type { Document } from "mongoose";

export interface IWorkSessions extends Document {
  user: string;
  project: string;
  session: Isession[];
  date: Date;
  time: number;
}

export interface Isession {
  start: Date;
  end: Date;
}

const WorkSessionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  project: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Project",
  },
  session: [
    {
      start: {
        type: Date,
        required: true,
      },
      end: {
        type: Date,
        required: true,
      },
    },
  ],
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
});

export default model<IWorkSessions>("WorkSessions", WorkSessionSchema);
