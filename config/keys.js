require("dotenv").config();
const keys = {
  mongoURL: process.env.URI,
  jwtSecret: process.env.jwtSecret,
  Email: process.env.Email,
  Password: process.env.Password,
};

module.exports = keys;
