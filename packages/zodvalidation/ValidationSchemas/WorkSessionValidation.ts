import { z } from "zod";
import { ProjectSchema } from "./ProjectValidation";

export const WorkSessionSchema = z.object({
  user: z.string().or(z.unknown()),
  project: z.string().or(ProjectSchema.partial()),
  session: z.array(
    z.object({
      Time: z.number(),
      CreatedAt: z.date().optional(),
      UpdatedAt: z.date().optional(),
    })
  ),
  date: z.date().optional(),
  Time: z.number().optional(),
});
