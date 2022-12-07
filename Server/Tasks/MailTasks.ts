import { CloudTasksClient } from "@google-cloud/tasks";
import { Service, Inject } from "typedi";
import { Logger } from "winston";
import keys from "../config/keys";
import { IUser } from "../models/User";

@Service()
export default class MailTasks {
  constructor(
    @Inject("logger") private logger: Logger,
    @Inject("GoogleTaskClient") private client: CloudTasksClient
  ) {}

  public async ResetPassword({
    host,
    email,
    token,
  }: {
    host: string;
    email: string;
    token: string;
  }) {
    const Body = {
      host,
      email,
      token,
    };

    const ProjectId = keys.GoogleTask.projectId;
    const Location = keys.GoogleTask.location;

    if (typeof ProjectId !== "string" || typeof Location !== "string") {
      this.logger.warn("Api key Error");
      throw Error("Server Error");
    }

    // const accessToken = this.GetPrivateToken();

    const [response] = await this.client.createTask({
      parent: this.client.queuePath(ProjectId, Location, "reset-password"),
      task: {
        httpRequest: {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${accessToken}`,
          },
          httpMethod: "POST",
          url: keys.GoogleTask.ResetPasswordURL,
          body: Buffer.from(JSON.stringify(Body)).toString("base64"),
        },
        scheduleTime: {
          seconds: 5 + Date.now() / 1000,
        },
      },
    });

    this.logger.info("Reset Password Task is Created");
    return response.name;
  }

  public async SendGreetingMail(user: Omit<IUser, "date">) {
    const ProjectId = keys.GoogleTask.projectId;
    const Location = keys.GoogleTask.location;

    if (typeof ProjectId !== "string" || typeof Location !== "string") {
      this.logger.warn("Api key Error");
      throw Error("Server Error");
    }

    // const accessToken = await this.GetPrivateToken();

    try {
      const [response] = await this.client.createTask({
        parent: this.client.queuePath(ProjectId, Location, "greetingEmails"),
        task: {
          httpRequest: {
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Bearer ${accessToken}`,
            },
            httpMethod: "POST",
            url: keys.GoogleTask.GreetingURL,
            body: Buffer.from(JSON.stringify(user)).toString("base64"),
          },
          scheduleTime: {
            seconds: 5 + Date.now() / 1000,
          },
        },
      });
      this.logger.info("Greeting Task is Created");
      return response.name;
    } catch (error) {
      if (error instanceof Error)
        this.logger.error("Task Failed to create" + error.message);
      throw Error("Server Error: Please Try Again");
    }
  }
  // public async GetPrivateToken() {
  //   const tokens = await this.auth.getAccessToken();
  //   const accessToken = tokens.token;
  //   return accessToken;
  // }
}
