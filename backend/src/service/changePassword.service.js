import bcrypt from "bcrypt";

import { User } from "../model/auth.model.js";
import { config_ENV } from "../config/config.js";
import { ApiError } from "../utils/ApiError.js";

export const changePasswordService = async (userId, { oldPassword, newPassword }) => {
    // 1. Check user id
    if (!userId) {
        throw new ApiError(401, "Unauthorized request");
    }

    // 2. Check empty fields
    if (!oldPassword || !newPassword) {
        throw new ApiError(400, "Old password and new password are required");
    }

    // 3. Validate new password
    if (newPassword.length < 6) {
        throw new ApiError(400, "New password must be at least 6 characters");
    }

    // 4. Check old and new password same or not
    if (oldPassword === newPassword) {
        throw new ApiError(400, "New password must be different from old password");
    }

    // 5. Find user with password
    const user = await User.findById(userId).select("+password +refreshToken");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // 6. Compare old password
    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Old password is incorrect");
    }

    // 7. Hash new password
    const saltRounds = Number(config_ENV.BCRYPT_SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // 8. Save new password and clear refresh token
    user.password = hashedPassword;
    user.refreshToken = "";

    await user.save();

    // 9. Return response
    return {
        message: "Password changed successfully. Please login again",
    };
};