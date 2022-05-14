import { body } from "express-validator";

export const ProjectValidator = (method: string) => {
  switch (method) {
    case "CreateProject": {
      return [
        body("title", "Title is required").notEmpty(),
        body("description", "Description is required").notEmpty(),
        body("technologies", "Technologies is required").notEmpty().isArray({
          min: 1,
        }),
      ];
    }
    case "UpdateProject": {
      return [
        body("title", "Title is required").notEmpty(),
        body("description", "Description is required").notEmpty(),
        body("technologies", "Technologies is required").notEmpty(),
        body("technologies", "Technologies is required").notEmpty().isArray({
          min: 1,
        }),
      ];
    }
    case "CreateRoadMap": {
      return [
        body("name", "Name is required").notEmpty(),
        body("progress", "Progress is required").notEmpty(),
        body("github", "Github is required").notEmpty(),
      ];
    }
    case "UpdateRoadMap": {
      return [
        body("name", "Name is required").notEmpty(),
        body("progress", "Progress is required").notEmpty(),
        body("github", "Github is required").notEmpty(),
      ];
    }
    default: {
      throw new Error("Method not found");
    }
  }
};
