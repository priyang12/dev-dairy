import { Schema, model } from "mongoose";
import type { Document } from "mongoose";

export interface IWorkSessions extends Document {
  user: string;
  project: string;
  session: ISession[];
  date: Date;
  Time: number;
}

export interface ISession {
  Time: number;
  CreatedAt: Date;
  UpdatedAt: Date;
}

const Session = new Schema(
  {
    Time: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

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
  session: [Session],
  date: {
    type: Date,
    required: true,
  },
  Time: {
    type: Number,
    default: 0,
    required: true,
  },
});

export default model<IWorkSessions>("WorkSessions", WorkSessionSchema);
