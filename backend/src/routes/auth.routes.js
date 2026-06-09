import express from "express";

import {
    registerController,
    verifyEmailController,
    resendOtpController,
    loginController,
    refreshTokenController,
    meController,
    logoutController,
    forgotPasswordController,
    resetPasswordController,
    changePasswordController,
    updateProfileController,
} from "../controller/auth.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

export const authRouter = express.Router();

// Public Auth
authRouter.post("/register", registerController);
authRouter.post("/verify-email", verifyEmailController);
authRouter.post("/resend-otp", resendOtpController);
authRouter.post("/login", loginController);
authRouter.post("/refresh-token", refreshTokenController);

// Password Recovery
authRouter.post("/forgot-password", forgotPasswordController);
authRouter.post("/reset-password", resetPasswordController);

// Protected User
authRouter.get("/me", authMiddleware, meController);
authRouter.post("/logout", authMiddleware, logoutController);
authRouter.patch("/change-password", authMiddleware, changePasswordController);
authRouter.patch("/update-profile", authMiddleware, updateProfileController);

// Example Admin Route
authRouter.get(
    "/admin-check",
    authMiddleware,
    authorizeRoles("admin"),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: "Admin route access granted",
        });
    }
);