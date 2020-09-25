const nodemailer = require("nodemailer");

const verifyEmail = async (options) => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html:
      "<div style =" +
      "width:100%; height:100%;  " +
      "><h1 style=" +
      "font-weight:500>Hey, " +
      options.name +
      "<br>Welcome to my e-commerce site</h1><h1>Thanks for Signing up on our app</h1><h3>Your Code for verification is : " +
      options.code +
      " </h3></div><p>If this request is not made by you kindly ignore this mail.</p><p>Regards, <strong>Sajid Ansari</strong></p>",
  };

  let info = await transporter.sendMail(message);
};
module.exports = verifyEmail;
