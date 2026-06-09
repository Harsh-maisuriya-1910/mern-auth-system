import bcrypt from "bcrypt";

// ERROR FIXED: Corrected the relative import paths from two directories up '../../' to one directory up '../'.
// Also corrected 'generateOtp.js' to 'otp.js' which is the correct file name.
import { User } from "../model/auth.model.js";
import { config_ENV } from "../config/config.js";
import { generateOtp, hashOtp } from "../utils/otp.js";
import { sendEmail } from "../utils/sendEmail.js";
import { emailVerificationTemplate } from "../utils/emailTemplates.js";
import { ApiError } from "../utils/ApiError.js";

export const registerService = async ({ username, email, password }) => {
    if (!username || !email || !password) {
        throw new ApiError(400, "Username, email and password are required");
    }

    username = username.trim();
    email = email.trim().toLowerCase();

    if (username.length < 3) {
        throw new ApiError(400, "Username must be at least 3 characters");
    }

    if (password.length < 6) {
        throw new ApiError(400, "Password must be at least 6 characters");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(409, "User already exists with this email");
    }

    const saltRounds = Number(config_ENV.BCRYPT_SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // CHANGE APPLIED: Securely hash the verification OTP before saving it to the database.
    // Originally, this was stored in plain text, which posed a security risk if the database was leaked.
    const verifyOtp = generateOtp();
    const verifyOtpExpireAt = new Date(Date.now() + 10 * 60 * 1000);
    const hashedOtp = await hashOtp(verifyOtp);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        isVerified: false,
        verifyOtp: hashedOtp,
        verifyOtpExpireAt,
    });

    await sendEmail({
        to: email,
        subject: "Verify your email",
        html: emailVerificationTemplate(username, verifyOtp),
    });

    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
    };
};