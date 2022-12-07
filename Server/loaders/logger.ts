import winston from "winston";
import keys from "../config/keys";
import { LoggingWinston } from "@google-cloud/logging-winston";

const loggingWinston = new LoggingWinston();

const transports = [];
if (process.env.NODE_ENV !== "development") {
  transports.push(new winston.transports.Console(), loggingWinston);
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat()
      ),
    })
  );
}

const LoggerInstance = winston.createLogger({
  level: keys.logs.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports,
});

export default LoggerInstance;
