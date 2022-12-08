var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const sgMail = require("@sendgrid/mail");
const puppeteer = require("puppeteer");
// Set your SendGrid API key
exports.sendpdfmail = (req, res) => __awaiter(this, void 0, void 0, function* () {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const html = req.body.html;
    const styles = req.body.styles;
    const browser = yield puppeteer.launch();
    const page = yield browser.newPage();
    yield page.addStyleTag({ content: styles });
    // Set the HTML content of the page
    yield page.setContent(html);
    // Generate the PDF
    const pdf = yield page.pdf();
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
    yield sgMail.send(msg);
    // Return a success response
    res.send({ success: true });
});
