import { ApiError } from "../utils/ApiError.js";

export const meService = async (user) => {
    // 1. Check user exists from authMiddleware
    if (!user) {
        throw new ApiError(401, "Unauthorized request");
    }

    // 2. Return safe user data
    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        lastLoginAt: user.lastLoginAt,
        createdAt: user.createdAt,
    };
};