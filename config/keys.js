require("dotenv").config();
const keys = {
  mongoURL: process.env.URI,
  jwtSecret: process.env.jwtSecret,
};

module.exports = keys;
