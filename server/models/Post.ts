import { Schema, model } from "mongoose";
import type { Model, Document } from "mongoose";

interface IPost extends Document {
  user: string;
  title: string;
  description: string;
  comments: Array<{
    user: string;
    text: string;
  }>;
  likes: Array<{
    user: string;
  }>;
  dislikes: Array<{
    user: string;
  }>;
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
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  dislikes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});
const Post: Model<IPost> = model<IPost>("post", PostSchema);

export default Post;
