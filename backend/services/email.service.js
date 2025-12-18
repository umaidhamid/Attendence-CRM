import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);
export const sendSetPasswordEmail = async (toEmail, resetUrl) => {
  await transporter.sendMail({
    from: `"Attendance System" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Set your password",
    html: `
      <h3>Welcome to Attendance System</h3>
      <p>Click the link below to set your password:</p>
      <a href="${resetUrl}">Set Password</a>
      <p>This link will expire in 15 minutes.</p>
    `,
  });
};
