// sendVerificationEmail.ts
import * as nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";

export async function sendVerificationEmail(
  name: string,
  user: any,
  type: string,
) {
  try {
    // Create a Nodemailer transporter using SMTP
    const transporter = nodemailer.createTransport(
      smtpTransport({
        host: "mail.smtp2go.com",
        port: 2525,
        secure: false, // Set to true if your SMTP server requires a secure connection
        auth: {
          user: "sales.webheay@gmail.com",
          pass: "sGrIZm7_1(@7",
        },
        requireTLS: true,
      })
    );

    const email = user.email;

    const htmlTemplate = `
       <p>Dear <b>${name}</b>,</p>
       <p>If you did not sign up for our service, please ignore this email.</p>
     `;
    // Setup email data
    const mailOptions = {
      from: "<provider mail>",
      to: email,
      subject: "xyz",
      html: htmlTemplate,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Verification email sent. Message ID: %s", info.messageId);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
}
