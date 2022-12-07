import { Response, Request } from "@google-cloud/functions-framework";
import * as sgMail from "@sendgrid/mail";
import * as dotenv from "dotenv";

exports.sendgreetmail = async (req: Request, res: Response) => {
  // set api key
  dotenv.config();
  if (typeof process.env.SENDGRID_API_KEY !== "string") {
    throw Error("wrong api keys");
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const { username, email } = req.body.user;

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

  console.log(`Greeting mail generated for ${username}`);

  await sgMail.send(mail);

  res.status(201).send("Email sent successfully.");
};
