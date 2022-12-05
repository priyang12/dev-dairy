import { z } from "zod";
import { ProjectSchema } from "./ProjectValidation";

export const SessionSchema = z.object({
  Time: z.number(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const WorkSessionSchema = z.object({
  user: z.string().or(z.unknown()),
  project: z.string().or(ProjectSchema.partial()),
  session: z.array(SessionSchema),
  date: z.string().optional(),
  Time: z.number().optional(),
});
