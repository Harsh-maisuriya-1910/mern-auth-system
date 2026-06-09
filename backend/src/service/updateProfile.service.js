import { User } from "../model/auth.model.js";
import { ApiError } from "../utils/ApiError.js";

export const updateProfileService = async (userId, { username }) => {
    if (!userId) {
        throw new ApiError(401, "Unauthorized request");
    }

    if (!username) {
        throw new ApiError(400, "Username is required");
    }

    username = username.trim();

    if (username.length < 3) {
        throw new ApiError(400, "Username must be at least 3 characters");
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
            $set: {
                username,
            },
        },
        {
            new: true,
            runValidators: true,
        }
    ).select("-password -refreshToken -verifyOtp -verifyOtpExpireAt -resetOtp -resetOtpExpireAt");

    if (!updatedUser) {
        throw new ApiError(404, "User not found");
    }

    return {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
        isVerified: updatedUser.isVerified,
        updatedAt: updatedUser.updatedAt,
    };
};