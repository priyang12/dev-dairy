import { Schema, model } from "mongoose";
import type { Model, InferSchemaType } from "mongoose";

// Create Schema
const TestUserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export type ITestUser = InferSchemaType<typeof TestUserSchema>;

const TestUser: Model<ITestUser> = model<ITestUser>("TestUser", TestUserSchema);

export type TestUserModelType = Model<ITestUser>;

export default TestUser;
