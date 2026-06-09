import { mailTransporter } from "../config/mail.config.js";
import { config_ENV } from "../config/config.js";

export const sendEmail = async ({ to, subject, html }) => {
  try {
    // Send email using pre-configured mailTransporter
    await mailTransporter.sendMail({
      from: `"${config_ENV.EMAIL_FROM_NAME}" <${config_ENV.EMAIL_FROM_EMAIL}>`,
      to,
      subject,
      html,
    });
  } catch (err) {
    // Graceful fallback to avoid app crashes when SMTP is not configured
    const otp = html.match(/\b\d{6}\b/)?.[0] || "N/A";
    console.log(`[SMTP Offline] Email to: ${to} | 🔑 OTP: ${otp}`);
  }
};