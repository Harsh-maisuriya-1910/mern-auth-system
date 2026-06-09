import jwt from "jsonwebtoken";
import { User } from "../model/auth.model.js";
import { config_ENV } from "../config/config.js";
import { generateAccessToken } from "../utils/token.js";
import { ApiError } from "../utils/ApiError.js";

export const refreshTokenService = async (cookies) => {
    // 1. Read refresh token from cookie
    const refreshToken = cookies?.refreshToken;

    // 2. Check refresh token exists
    if (!refreshToken) {
        throw new ApiError(401, "Refresh token is missing. Please login again");
    }

    // 3. Verify refresh token
    const decodedToken = jwt.verify(
        refreshToken,
        config_ENV.REFRESH_TOKEN_SECRET
    );

    // 4. Find user by decoded id
    const user = await User.findById(decodedToken._id).select("+refreshToken");

    // 5. Check user exists
    if (!user) {
        throw new ApiError(401, "Invalid refresh token. User not found");
    }

    // 6. Match DB refresh token with cookie refresh token
    if (user.refreshToken !== refreshToken) {
        throw new ApiError(401, "Refresh token is invalid or expired");
    }

    // 7. Generate new access token
    const accessToken = generateAccessToken(user);

    // 8. Return access token
    return {
        accessToken,
    };
};