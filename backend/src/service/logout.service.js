// ERROR FIXED: Corrected the relative import path from two directories up '../../' to one directory up '../'.
import { User } from "../model/auth.model.js";
import { ApiError } from "../utils/ApiError.js";

export const logoutService = async (userId) => {
    // 1. Check userId
    if (!userId) {
        throw new ApiError(401, "Unauthorized request");
    }

    // 2. Remove refresh token from database
    await User.findByIdAndUpdate(
        userId,
        {
            $set: {
                refreshToken: "",
            },
        },
        {
            new: true,
        }
    );

    // 3. Return success message
    return {
        message: "Logout successful",
    };
};