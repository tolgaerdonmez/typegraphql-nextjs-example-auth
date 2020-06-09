import nodemailer from "nodemailer";
import emailConfig from "../../nodemailer.config.json";

export async function sendMail(subject: string, emailTo: string, url: string) {
  // Generate test SMTP service account from ethereal.email

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport(emailConfig);

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: emailConfig.auth.user, // sender address
    to: emailTo, // list of receivers
    subject, // Subject line
    text: "Click the link below", // plain text body
    html: `<a href="${url}">Click this link to perform required the action</a>`,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
