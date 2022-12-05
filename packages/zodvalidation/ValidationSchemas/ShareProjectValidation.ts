import { z } from "zod";
import { ProjectSchema } from "./ProjectValidation";

export const ShareProjectSchema = z.object({
  userId: z.string(),
  projectId: z.string().or(ProjectSchema),
  expirationTime: z.date().or(z.string()),
  JWTToken: z.string(),
});
