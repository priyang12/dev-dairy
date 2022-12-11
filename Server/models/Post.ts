import { Schema, model } from "mongoose";
import type { Model } from "mongoose";
import { z, PostSchema as ZodPost } from "@dev-dairy/zodvalidation";

export type IPost = z.infer<typeof ZodPost> & {
  _id: string;
};

// Create Schema
const PostSchema = new Schema<IPost>({
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
    ref: "project",
  },
  status: {
    type: String,
    required: true,
  },
  roadMap: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Post: Model<IPost> = model<IPost>("post", PostSchema);

export default Post;
