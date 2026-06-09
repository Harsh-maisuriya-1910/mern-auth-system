import { User } from "../model/auth.model.js";
import { compareOtp } from "../utils/otp.js";
import { ApiError } from "../utils/ApiError.js";

export const verifyEmailService = async ({ email, otp }) => {
    if (!email || !otp) {
        throw new ApiError(400, "Email and OTP are required");
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

    if (!user.verifyOtp) {
        throw new ApiError(400, "OTP not found. Please request a new OTP");
    }

    // CHANGE APPLIED: Compare the plain incoming OTP with the hashed OTP stored in the database.
    // Originally, this did a direct comparison (user.verifyOtp !== otp), which failed when we introduced hashing.
    const isOtpCorrect = await compareOtp(otp, user.verifyOtp);

    if (!isOtpCorrect) {
        throw new ApiError(400, "Invalid OTP");
    }

    if (user.verifyOtpExpireAt < new Date()) {
        throw new ApiError(400, "OTP expired. Please request a new OTP");
    }

    user.isVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = null;

    await user.save();

    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
    };
};