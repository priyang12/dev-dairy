import { Schema, model, ObjectId } from 'mongoose';
import type { Model, Document } from 'mongoose';

interface IUser extends Document {
  _id: ObjectId;
  email: string;
  user: string;
  ImageUrl: string;
}

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  ImageUrl: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const User: Model<IUser> = model<IUser>('User', UserSchema);

export default User;