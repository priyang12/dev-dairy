import { body } from "express-validator";

export const ProjectValidator = (method: string) => {
  switch (method) {
    case "CreatePost": {
      return [
        body("title", "Title is required").notEmpty(),
        body("description", "Description is required").notEmpty(),
      ];
    }

    default: {
      throw new Error("Method not found");
    }
  }
};
