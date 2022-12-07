import { Response, Request } from "@google-cloud/functions-framework";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

exports.sendresetgmail = async (req: Request, res: Response) => {
  // set api key
  dotenv.config();
  if (typeof process.env.SENDGRID_API_KEY !== "string") {
    throw Error("wrong api keys");
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const { host, email, token } = req.body;
  const mail = {
    from: "patelpriyang95@gmail.com",
    to: email,
    subject: "Password Recover",
    html: `<h1>For Reset the Password<h1><div>The token link is <a href="https://${host}/ResetPassword/${token}">click here</a>
                click on the link</div>`,
  };
  console.log(`Reset Link has been Send`);

  await sgMail.send(mail);

  res.status(201).send(`Reset Mail ${email} sent successfully.`);
};
