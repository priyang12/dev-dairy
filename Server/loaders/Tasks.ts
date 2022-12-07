import { Container } from "typedi";
import { Logger } from "winston";
import { CloudTasksClient } from "@google-cloud/tasks";

export default async () => {
  const Logger: Logger = Container.get("logger");

  const client = new CloudTasksClient();

  Container.set("GoogleTaskClient", client);

  Logger.info("Google Task Client set Up Success");

  Logger.info(`Created password reset queue`);
};
