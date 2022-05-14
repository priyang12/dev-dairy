import { Schema, model } from "mongoose";
import type { Model, Document } from "mongoose";

export interface IPost extends Document {
  user: string;
  title: string;
  description: string;
  project: string;
  date: Date;
}

// Create Schema
const PostSchema = new Schema({
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
  project: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Project",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Post: Model<IPost> = model<IPost>("post", PostSchema);

export default Post;
