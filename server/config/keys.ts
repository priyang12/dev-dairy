import dotenv from "dotenv";
dotenv.config();

const keys = {
  Port: process.env.PORT || 5000,
  mongoURL: process.env.URI,
  mongoDevURI: process.env.Test_URI,
  jwtSecret: process.env.jwtSecret,
  Email: process.env.Email,
  Password: process.env.Password,
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
  agenda: {
    dbCollection: process.env.AGENDA_DB_COLLECTION,
    pooltime: process.env.AGENDA_POOLTIME,
    concurrency: process.env.AGENDA_CONCURRENCY || 0,
  },
  api: {
    prefix: "/api",
  },
};

export default keys;
