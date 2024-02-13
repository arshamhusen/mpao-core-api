let nodemailer = require("nodemailer");

const mailTransport = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  port: 465,
  secure: true,
  auth: {
    user: "team@hivvaru.com",
    pass: "W3lc0me2HivV@ru",
  },
  tls: {
    ciphers: "SSLv3",
  },
});

exports.emailSender = async ({ email, subject, message }) => {
  const mailOptions = {
    from: `team@hivvaru.com`,
    to: email,
    subject: subject,
    html: message,
  };

  mailTransport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      return err;
    } else {
      console.log(info);
      return info;
    }
  });
};
