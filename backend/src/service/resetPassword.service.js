import bcrypt from "bcrypt";

import { User } from "../model/auth.model.js";
import { config_ENV } from "../config/config.js";
import { compareOtp } from "../utils/otp.js";
import { ApiError } from "../utils/ApiError.js";

export const resetPasswordService = async ({ email, otp, newPassword }) => {
    // 1. Check empty fields
    if (!email || !otp || !newPassword) {
        throw new ApiError(400, "Email, OTP and new password are required");
    }

    // 2. Clean email
    const normalizedEmail = email.trim().toLowerCase();

    // 3. Validate new password
    if (newPassword.length < 6) {
        throw new ApiError(400, "New password must be at least 6 characters");
    }

    // 4. Find user with reset OTP fields
    const user = await User.findOne({ email: normalizedEmail }).select(
        "+password +resetOtp +resetOtpExpireAt"
    );

    // 5. Check user exists
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // 6. Check OTP exists
    if (!user.resetOtp) {
        throw new ApiError(400, "Reset OTP not found. Please request a new OTP");
    }

    // 7. Check OTP match
    // CHANGE APPLIED: Compare the incoming plain password reset OTP with the hashed version in the database.
    const isOtpCorrect = await compareOtp(otp, user.resetOtp);
    if (!isOtpCorrect) {
        throw new ApiError(400, "Invalid reset OTP");
    }

    // 8. Check OTP expiry
    if (user.resetOtpExpireAt < new Date()) {
        throw new ApiError(400, "Reset OTP expired. Please request a new OTP");
    }

    // 9. Hash new password
    const saltRounds = Number(config_ENV.BCRYPT_SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // 10. Update password and clear OTP fields
    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = null;
    user.refreshToken = "";

    await user.save();

    // 11. Return success
    return {
        message: "Password reset successfully. Please login again",
    };
};