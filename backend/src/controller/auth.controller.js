import {
    registerService,
    verifyEmailService,
    resendOtpService,
    loginService,
    logoutService,
    meService,
    refreshTokenService,
    forgotPasswordService,
    resetPasswordService,
    changePasswordService,
    updateProfileService,
} from "../service/index.js";

import { asyncHandler } from "../utils/asyncHandler.js";

import {
    accessTokenCookieOptions,
    refreshTokenCookieOptions,
    clearAccessTokenCookieOptions,
    clearRefreshTokenCookieOptions,
} from "../utils/cookie.js";

/* 
|--------------------------------------------------------------------------
| 1. Register User
|--------------------------------------------------------------------------
| Flow:
| req.body -> registerService -> send verification OTP -> response
*/
export const registerController = asyncHandler(async (req, res) => {
    const result = await registerService(req.body);

    return res.status(201).json({
        success: true,
        message: "User registered successfully. Please verify your email.",
        data: result,
    });
});

/* 
|--------------------------------------------------------------------------
| 2. Verify Email
|--------------------------------------------------------------------------
| Flow:
| req.body email + otp -> verifyEmailService -> isVerified true
*/
export const verifyEmailController = asyncHandler(async (req, res) => {
    const result = await verifyEmailService(req.body);

    return res.status(200).json({
        success: true,
        message: "Email verified successfully",
        data: result,
    });
});

/* 
|--------------------------------------------------------------------------
| 3. Resend Verification OTP
|--------------------------------------------------------------------------
| Flow:
| req.body email -> resendOtpService -> send new OTP
*/
export const resendOtpController = asyncHandler(async (req, res) => {
    const result = await resendOtpService(req.body);

    return res.status(200).json({
        success: true,
        message: "Verification OTP sent successfully",
        data: result,
    });
});

/* 
|--------------------------------------------------------------------------
| 4. Login User
|--------------------------------------------------------------------------
| Flow:
| req.body email/password -> loginService -> generate tokens -> set cookies
*/
export const loginController = asyncHandler(async (req, res) => {
    const result = await loginService(req.body);

    return res
        .status(200)
        .cookie("accessToken", result.accessToken, accessTokenCookieOptions)
        .cookie("refreshToken", result.refreshToken, refreshTokenCookieOptions)
        .json({
            success: true,
            message: "User logged in successfully",
            data: {
                user: result.user,
            },
        });
});

/* 
|--------------------------------------------------------------------------
| 5. Get Current Logged-In User
|--------------------------------------------------------------------------
| Flow:
| authMiddleware -> req.user -> meService -> response
*/
export const meController = asyncHandler(async (req, res) => {
    const result = await meService(req.user);

    return res.status(200).json({
        success: true,
        message: "Current user fetched successfully",
        data: result,
    });
});

/* 
|--------------------------------------------------------------------------
| 6. Logout User
|--------------------------------------------------------------------------
| Flow:
| authMiddleware -> req.user._id -> logoutService -> clear cookies
*/
export const logoutController = asyncHandler(async (req, res) => {
    await logoutService(req.user._id);

    return res
        .status(200)
        .clearCookie("accessToken", clearAccessTokenCookieOptions)
        .clearCookie("refreshToken", clearRefreshTokenCookieOptions)
        .json({
            success: true,
            message: "User logged out successfully",
        });
});

/* 
|--------------------------------------------------------------------------
| 7. Refresh Access Token
|--------------------------------------------------------------------------
| Flow:
| req.cookies.refreshToken -> refreshTokenService -> new access token cookie
*/
export const refreshTokenController = asyncHandler(async (req, res) => {
    const result = await refreshTokenService(req.cookies);

    return res
        .status(200)
        .cookie("accessToken", result.accessToken, accessTokenCookieOptions)
        .json({
            success: true,
            message: "Access token refreshed successfully",
        });
});

/* 
|--------------------------------------------------------------------------
| 8. Forgot Password
|--------------------------------------------------------------------------
| Flow:
| req.body email -> forgotPasswordService -> send reset OTP
*/
export const forgotPasswordController = asyncHandler(async (req, res) => {
    const result = await forgotPasswordService(req.body);

    return res.status(200).json({
        success: true,
        message: "Password reset OTP sent successfully",
        data: result,
    });
});

/* 
|--------------------------------------------------------------------------
| 9. Reset Password
|--------------------------------------------------------------------------
| Flow:
| req.body email/otp/newPassword -> resetPasswordService -> update password
| After reset password, old cookies are cleared.
*/
export const resetPasswordController = asyncHandler(async (req, res) => {
    const result = await resetPasswordService(req.body);

    return res
        .status(200)
        .clearCookie("accessToken", clearAccessTokenCookieOptions)
        .clearCookie("refreshToken", clearRefreshTokenCookieOptions)
        .json({
            success: true,
            message: result.message,
        });
});

/* 
|--------------------------------------------------------------------------
| 10. Change Password
|--------------------------------------------------------------------------
| Flow:
| authMiddleware -> req.user._id + req.body.oldPassword/newPassword
| -> changePasswordService -> update password -> clear cookies
*/
export const changePasswordController = asyncHandler(async (req, res) => {
    const result = await changePasswordService(req.user._id, req.body);

    return res
        .status(200)
        .clearCookie("accessToken", clearAccessTokenCookieOptions)
        .clearCookie("refreshToken", clearRefreshTokenCookieOptions)
        .json({
            success: true,
            message: result.message,
        });
});

/* 
|--------------------------------------------------------------------------
| 11. Update Profile
|--------------------------------------------------------------------------
| Flow:
| authMiddleware -> req.user._id + req.body.username
| -> updateProfileService -> update username
*/
export const updateProfileController = asyncHandler(async (req, res) => {
    const result = await updateProfileService(req.user._id, req.body);

    return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: result,
    });
});