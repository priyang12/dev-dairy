import { body } from "express-validator";

const validate: any = (method: string) => {
  switch (method) {
    case "RegisterUser": {
      return [
        body("uid", "Invalid id").notEmpty(),
        body("username", "Username needs to max 8 characters")
          .notEmpty()
          .isLength({ max: 8 }),
        body("email", "Invalid email").isEmail(),
        body("ImageUrl", "Invalid email").notEmpty().isURL(),
      ];
    }
    case "loginUser": {
      return [body("email", "Invalid email").notEmpty().isEmail()];
    }
    case "Post": {
      return [
        body("text", "Text is required").notEmpty(),
        body("title", "Title is should me minimus 6 ").isInt({ min: 6 }),
      ];
    }
  }
};

export default validate;
