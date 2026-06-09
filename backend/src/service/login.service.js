import bcrypt from "bcrypt";

// ERROR FIXED: Corrected relative import paths from two levels up '../../' to one level up '../'.
// Also corrected the filename from 'generateToken.js' to 'token.js' which is the correct file name.
import { User } from "../model/auth.model.js";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../utils/token.js";
import { ApiError } from "../utils/ApiError.js";

export const loginService = async ({ email, password }) => {
    // 1. Check empty fields
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    // 2. Clean email
    const normalizedEmail = email.trim().toLowerCase();

    // 3. Find user with password and refreshToken field
    const user = await User.findOne({ email: normalizedEmail }).select(
        "+password +refreshToken"
    );

    // 4. Check user exists
    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    // 5. Check email verified
    if (!user.isVerified) {
        throw new ApiError(403, "Please verify your email before login");
    }

    // 6. Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid email or password");
    }

    // 7. Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // 8. Save refresh token in DB
    user.refreshToken = refreshToken;
    user.lastLoginAt = new Date();

    await user.save();

    // 9. Return safe data
    return {
        user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            isVerified: user.isVerified,
        },
        accessToken,
        refreshToken,
    };
};