import jwt from "jsonwebtoken";

import { User } from "../model/auth.model.js";
import { config_ENV } from "../config/config.js";
import { ApiError } from "../utils/ApiError.js";

export const authMiddleware = async (req, res, next) => {
    try {
        // 1. Get access token from cookie
        const accessToken = req.cookies?.accessToken;

        // 2. Check token exists
        if (!accessToken) {
            throw new ApiError(401, "Unauthorized. Access token is missing");
        }

        // 3. Verify token
        const decodedToken = jwt.verify(
            accessToken,
            config_ENV.ACCESS_TOKEN_SECRET
        );

        // 4. Find user from database
        const user = await User.findById(decodedToken._id).select(
            "-password -refreshToken -verifyOtp -verifyOtpExpireAt -resetOtp -resetOtpExpireAt"
        );

        // 5. Check user exists
        if (!user) {
            throw new ApiError(401, "Unauthorized. User not found");
        }

        // 6. Attach user to request
        req.user = user;

        // 7. Move to next controller
        next();
    } catch (error) {
        next(error);
    }
};