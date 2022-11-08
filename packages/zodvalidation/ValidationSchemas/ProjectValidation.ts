import { z } from "zod";

export const RoadMapSchema = z.object({
  name: z.string(),
  color: z.string(),
  _id: z.string().optional(),
  progress: z.number().optional().default(0),
  github: z.string().optional(),
});

export const ProjectErrorMessage = {
  title: {
    short: "Project title is too short (min 3 characters)",
    long: "Project title is too long (max 100 characters)",
  },
  description: {
    short: "Project description is too short (min 10 characters)",
    long: "Project description is too long (max 500 characters)",
  },
  github: "Invalid github url",
  website: "Please enter a valid URL starting with http:// or https://",
};

export const ProjectSchema = z.object({
  user: z.any(),
  title: z
    .string()
    .min(4, ProjectErrorMessage.title.short)
    .max(30, ProjectErrorMessage.title.long),
  description: z
    .string()
    .min(10, ProjectErrorMessage.description.short)
    .max(500, ProjectErrorMessage.description.long),
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
    }, ProjectErrorMessage.github)
    .optional(),

  website: z
    .string()
    .refine((val) => val.startsWith("http://") || val.startsWith("https://"), {
      message: ProjectErrorMessage.website,
    })
    .optional(),
  date: z.date().optional(),
});

export const CreateProjectValidation = ProjectSchema.omit({
  user: true,
});
