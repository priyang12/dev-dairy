import { z } from "zod";

export const RoadMapSchema = z.object({
  new: z.string(),
  name: z.string(),
  color: z.string(),
  progress: z.number().optional().default(0),
  github: z.string().optional(),
});

export const ProjectSchema = z.object({
  user: z.any(),
  title: z.string().min(4).max(30),
  description: z.string().min(10).max(400),
  technologies: z.array(z.string()),
  roadMap: z.array(RoadMapSchema).optional(),
  process: z.number().default(1),
  live: z.boolean().optional(),
  github: z
    .string()
    .refine((val) => {
      try {
        const url = new URL(val);
        if (url.protocol === "https:" && url.hostname === "github.com") {
          return true;
        }
      } catch (error) {
        return false;
      }
      return false;
    }, "Must be a valid Github URL")
    .optional(),

  website: z
    .string()
    .refine((val) => val.startsWith("http://") || val.startsWith("https://"), {
      message: "Please enter a valid URL starting with http:// or https://",
    })
    .optional(),
  date: z.date().optional(),
});

export const CreateProjectValidation = ProjectSchema.omit({
  user: true,
});
