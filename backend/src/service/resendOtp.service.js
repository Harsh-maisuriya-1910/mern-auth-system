// ERROR FIXED: Corrected the relative import paths from two directories up '../../' to one directory up '../'.
// Also corrected 'generateOtp.js' to 'otp.js' which is the correct file name.
import { User } from "../model/auth.model.js";
import { generateOtp, hashOtp } from "../utils/otp.js";
import { sendEmail } from "../utils/sendEmail.js";
import { emailVerificationTemplate } from "../utils/emailTemplates.js";
import { ApiError } from "../utils/ApiError.js";

export const resendOtpService = async ({ email }) => {
    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail }).select(
        "+verifyOtp +verifyOtpExpireAt"
    );

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (user.isVerified) {
        throw new ApiError(400, "Email is already verified");
    }

    // CHANGE APPLIED: Securely hash the newly generated OTP before saving it to the database.
    // The plain OTP is sent via email to the user, while the hashed OTP is stored for comparison.
    const verifyOtp = generateOtp();
    const verifyOtpExpireAt = new Date(Date.now() + 10 * 60 * 1000);
    const hashedOtp = await hashOtp(verifyOtp);

    user.verifyOtp = hashedOtp;
    user.verifyOtpExpireAt = verifyOtpExpireAt;

    await user.save();

    await sendEmail({
        to: user.email,
        subject: "Verify your email - New OTP",
        html: emailVerificationTemplate(user.username, verifyOtp),
    });

    return {
        email: user.email,
        message: "New verification OTP sent to your email",
    };
};