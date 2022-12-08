import { CloudTasksClient } from "@google-cloud/tasks";
import dotenv from "dotenv";

export default async () => {
  // Logger.info("Google Auth set Up Success");
  const client = new CloudTasksClient();

  dotenv.config();

  const ProjectId = process.env.GoogleProjectId;
  const Location = process.env.location;

  if (typeof ProjectId !== "string" || typeof Location !== "string") {
    throw Error("Wrong Keys");
  }

  // Create a queue for greeting emails
  const greeting = {
    name: client.queuePath(ProjectId, Location, "greeting-emails"),
    rateLimits: {
      maxTasksDispatchedPerSecond: 10,
      maxBurstSize: 100,
    },
  };
  const [greetQueue] = await client.createQueue({
    parent: client.locationPath(ProjectId, Location),
    queue: greeting,
  });

  console.log(greetQueue.name);
};
