const nodemailer = require('nodemailer');
const config = require("config");

const sendEmail = async options => {
  // Create SMTP trasporter object
  const transport = nodemailer.createTransport({
    host: config.get("SMTP_HOST"),
    port: config.get("SMTP_PORT"),
    auth: {
      user: config.get("SMTP_EMAIL"),
      pass: config.get("SMTP_PASSWORD")
    }
  });

  // Message object
  const message = {
    from: `${config.get("FROM_NAME")} <${config.get("FROM_EMAIL")}>`,
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  const info = await transport.sendMail(message);

  console.log(`Message sent successfully as ${info.messageId}`);
};

module.exports = sendEmail;