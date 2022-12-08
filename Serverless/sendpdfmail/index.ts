const sgMail = require("@sendgrid/mail");
const puppeteer = require("puppeteer");

// Set your SendGrid API key

exports.sendpdfmail = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const html = req.body.html;
  const styles = req.body.styles;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.addStyleTag({ content: styles });

  // Set the HTML content of the page
  await page.setContent(html);

  // Generate the PDF
  const pdf = await page.pdf();

  // Create the email message
  const msg = {
    to: "recipient@example.com",
    from: "sender@example.com",
    subject: "Here is your PDF document",
    text: "Please find attached your PDF document.",
    attachments: [
      {
        content: pdf.toString("base64"),
        filename: "document.pdf",
        type: "application/pdf",
        disposition: "attachment",
      },
    ],
  };

  // Send the email
  await sgMail.send(msg);

  // Return a success response
  res.send({ success: true });
};
