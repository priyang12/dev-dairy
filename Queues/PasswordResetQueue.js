import { CloudTasksClient } from "@google-cloud/tasks";
import dotenv from "dotenv";

export default async () => {
  dotenv.config();

  const client = new CloudTasksClient();

  const ProjectId = process.env.GoogleProjectId;
  const Location = process.env.location;

  if (typeof ProjectId !== "string" || typeof Location !== "string") {
    throw Error("Wrong Keys");
  }

  // Create a queue for password reset emails

  const passwordResetQueueSet = {
    name: client.queuePath(ProjectId, Location, "reset-password"),
    rateLimits: {
      maxTasksDispatchedPerSecond: 1,
      maxBurstSize: 10,
    },
    retryConfig: {
      maxAttempts: 5,
    },
  };

  const [passwordResetQueue] = await client.createQueue({
    parent: client.locationPath(ProjectId, Location),
    queue: passwordResetQueueSet,
  });

  console.log("Password Queue Created" + passwordResetQueue.name);
  process.exit();
};
