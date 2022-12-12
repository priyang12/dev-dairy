import dotenv from "dotenv";
dotenv.config();

const keys = {
  Port: process.env.PORT || 5000,
  mongoURL: process.env.URI,
  mongoDevURI: process.env.Test_URI,
  clientURLs: process.env.ClientURL
    ? process.env.ClientURL.split(",")
    : ["http://localhost:3000"],

  jwtSecret: process.env.jwtSecret,
  Email: process.env.Email,
  Password: process.env.Password,
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
  GoogleTask: {
    projectId: process.env.GoogleProjectId,
    location: process.env.location,
    APIKey: process.env.GoogleAPIKey,
    ResetPasswordURL: process.env.ResetPasswordURL,
    GreetingURL: process.env.GreetingURL,
  },
  api: {
    prefix: "/api",
  },
  sendGrid: process.env.SENDGRID_API_KEY,
};

export default keys;
