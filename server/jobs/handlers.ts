import { Container } from "typedi";
import { Logger } from "winston";
import MailerService from "../services/MailService";

export const Greet = async (job: any, done: any): Promise<void> => {
  const Logger: Logger = Container.get("logger");
  try {
    Logger.debug("Email Greeting Job triggered!");

    const mailerServiceInstance = Container.get(MailerService);
    await mailerServiceInstance.SendGreetingMail(job.attrs.data);
    done();
  } catch (e) {
    Logger.error("🔥 Error with Email Sequence Job: %o", e);
    done(e);
  }
};

export const ResetPassword = async (job: any, done: any): Promise<void> => {
  const Logger: Logger = Container.get("logger");
  try {
    Logger.debug("Reset Password Job triggered!");
    const { token, host, email } = job.attrs.data;
    const mailerServiceInstance = Container.get(MailerService);
    await mailerServiceInstance.ResetPasswordLink(email, token, host);
    done();
  } catch (e) {
    Logger.error("🔥 Error with Email Sequence Job: %o", e);
    done(e);
  }
};
