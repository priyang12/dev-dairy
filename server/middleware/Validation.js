const { body } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "RegisterUser": {
      return [
        body("username", "Username needs to max 8 characters")
          .notEmpty()
          .isLength({ max: 8 }),
        body("email", "Invalid email").isEmail(),
        body(
          "password",
          "Password is required to have minimum 6 characters"
        ).isInt({ min: 6 }),
      ];
    }
    case "loginUser": {
      return [
        body("email", "Invalid email").notEmpty().isEmail(),
        body("password", "Password is required to have minimum 6 characters")
          .notEmpty()
          .isInt({ min: 6 }),
      ];
    }
  }
};
