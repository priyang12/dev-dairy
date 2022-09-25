import { z } from "zod";
import { ProjectSchema, RoadMapSchema } from "./ProjectValidation";

//mongoose.Schema.Types.ObjectId need to use Types.ObjectId;

export const PostErrorMessages = {
  title: {
    short: "Title is too short",
    long: "Title is too long",
  },
  description: {
    short: "Description is too short need to be at least 10 characters",
    long: "Description is too long no more than 400 characters",
  },
  project: "Project should be a valid project",
  roadMap: "RoadMap should be a valid roadMap",
};

export const PostSchema = z.object({
  _id: z.string(),
  user: z.any(),
  title: z
    .string()
    .min(4, PostErrorMessages.title.short)
    .max(30, PostErrorMessages.title.long),
  description: z
    .string()
    .min(10, PostErrorMessages.description.short)
    .max(400, PostErrorMessages.description.long),
  project: z
    .string()
    .min(1, PostErrorMessages.project)
    .or(ProjectSchema.partial()),
  roadMap: z
    .string()
    .min(1, PostErrorMessages.roadMap)
    .or(RoadMapSchema.partial()),
  status: z.string().default("Not Started"),

  date: z.date(),
});

export const CreatePostValidation = PostSchema.omit({ _id: true, date: true });
