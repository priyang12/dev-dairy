import type { MailService as sgMailService } from "@sendgrid/mail";
import { IUser } from "../models/User";
import { Service, Inject } from "typedi";
import { Model } from "mongoose";
import { Logger } from "winston";

@Service()
export default class MailService {
  constructor(
    @Inject("userModel") private userModel: Model<IUser>,
    @Inject("sgMail") private sgMail: sgMailService,
    @Inject("logger") private logger: Logger
  ) {}
  public async SendGreetingMail(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw Error("User is Not Found");
    }
    const { username, email } = user as IUser;
    const subject = "Welcome to the app";
    const text = `Hi ${username}, welcome to the app!`;
    const html = `Hi ${username}, welcome to the app!`;
    const mail = {
      to: `${email}`,
      from: "patelpriyang95@gmail.com",
      subject: subject,
      text: text,
      html: html,
    };
    await this.sgMail.send(mail);
    this.logger.info(`Greeting mail send for ${username}`);
  }
  public async ResetPasswordLink(email: string, token: string, host: string) {
    const mail = {
      from: "patelpriyang95@gmail.com",
      to: email,
      subject: "Password Recover",
      html: `<h1>For Reset the Password<h1><div>The token link is <a href="https://${host}/ResetPassword/${token}">click here</a>
                  click on the link</div>`,
    };
    await this.sgMail.send(mail);
    this.logger.info(`Reset Link has been Send`);
  }
}
