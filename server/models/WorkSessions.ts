import { Schema, model } from "mongoose";
import {
  z,
  WorkSessionSchema as ZodWorkSession,
} from "@dev-dairy/zodvalidation";

export type IWorkSessions = z.infer<typeof ZodWorkSession>;

export type ISession = IWorkSessions["session"][0];

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

const WorkSessionSchema = new Schema<IWorkSessions>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  project: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "project",
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
