import { z } from "zod";
import { ProjectSchema, RoadMapSchema } from "./ProjectValidation";

//mongoose.Schema.Types.ObjectId need to use Types.ObjectId;

export const PostSchema = z.object({
  user: z.any(),
  title: z.string().min(4).max(30),
  description: z.string().min(10).max(400),
  project: z.string().or(ProjectSchema.partial()),
  roadMap: z.string().or(RoadMapSchema.partial()),
  status: z.string(),
  date: z.date(),
});

export const CreatePostValidation = PostSchema.omit({ _id: true, date: true });
