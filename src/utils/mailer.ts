// sendVerificationEmail.ts
import * as nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";

export async function sendVerificationEmail(
  user: any,
  otp: number,
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
    const port = process.env.PORT || 8000; // Default to 8000 if PORT is undefined
    const name = user.full_name

    const verificationUrl = `http://localhost:${port}/user/verify-email?token=${encodeURIComponent(user.verify_token)}`;
    console.log(verificationUrl)
    const htmlTemplate = `
       <p>Dear <b>${name}</b>,</p>
        <p>Your OTP for verification is: <b>${otp}</b></p>
        <p>Alternatively, you can verify your email by clicking the button below:</p>
        <a href="${verificationUrl}" 
          style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">
          Verify Email
        </a>
       <p>If you did not sign up for our service, please ignore this email.</p>
     `;
    // Setup email data
    const mailOptions = {
      from: "<provider mail>",
      to: email,
      subject: "User verification",
      html: htmlTemplate,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Verification email sent. Message ID: %s", info.messageId);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
}
