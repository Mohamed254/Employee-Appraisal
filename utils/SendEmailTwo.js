const config = require("config");
const sgMail = require ('@sendgrid/mail');



sgMail.setApiKey(config.get("SENDGRID_API"));

const SendEmailTwo = (receiver, source, subject, content) => {
  try {
    const data = {
      to: receiver,
      from: source,
      subject,
      html: content,
    };
    return sgMail.send(data);
  } catch (e) {
    return new Error(e);
  }
};

module.exports = SendEmailTwo;