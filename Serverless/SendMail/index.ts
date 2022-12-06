const sgMail = require("@sendgrid/mail");

exports.GridMailer = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  await sgMail.send(req.mail);
  return {
    statusCode: 200,
    body: "Email sent successfully.",
  };
};
