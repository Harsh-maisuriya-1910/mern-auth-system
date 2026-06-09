import { User } from "../model/auth.model.js";
import { generateOtp, hashOtp } from "../utils/otp.js";
import { sendEmail } from "../utils/sendEmail.js";
import { resetPasswordTemplate } from "../utils/emailTemplates.js";
import { ApiError } from "../utils/ApiError.js";

export const forgotPasswordService = async ({ email }) => {
    // 1. Check email
    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    // 2. Clean email
    const normalizedEmail = email.trim().toLowerCase();

    // 3. Find user with reset fields
    const user = await User.findOne({ email: normalizedEmail }).select(
        "+resetOtp +resetOtpExpireAt"
    );

    // 4. Check user exists
    if (!user) {
        throw new ApiError(404, "User not found with this email");
    }

    // 5. Generate reset OTP
    const resetOtp = generateOtp();

    // 6. Set OTP expiry - 10 minutes
    const resetOtpExpireAt = new Date(Date.now() + 10 * 60 * 1000);
    
    // CHANGE APPLIED: Securely hash the forgot password reset OTP before saving to database.
    const hashedOtp = await hashOtp(resetOtp);

    // 7. Save OTP in database
    user.resetOtp = hashedOtp;
    user.resetOtpExpireAt = resetOtpExpireAt;

    await user.save();

    // 8. Send reset password email
    await sendEmail({
        to: user.email,
        subject: "Reset your password",
        html: resetPasswordTemplate(user.username, resetOtp),
    });

    // 9. Return safe response
    return {
        email: user.email,
        message: "Password reset OTP sent to your email",
    };
};