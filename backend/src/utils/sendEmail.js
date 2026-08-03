import { mailTransporter } from "../config/mail.config.js";
import { config_ENV } from "../config/config.js";

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await mailTransporter.sendMail({
      from: `"${config_ENV.EMAIL_FROM_NAME}" <${config_ENV.EMAIL_FROM_EMAIL}>`,
      to,
      subject,
      html,
    });

    console.log("Email sent successfully:", info.messageId);
  } catch (err) {
    console.error("Email sending failed:");
    console.error(err);
    throw err;
  }
};