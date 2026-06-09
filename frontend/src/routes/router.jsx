// CHANGE APPLIED: Configured the router endpoints to wrap public pages with PublicRoute and protected pages with ProtectedRoute.
// Also updated the imports to point to corrected folders (layouts/RootLayout instead of layout/AppLayout).
import { createBrowserRouter, Navigate } from "react-router-dom";

import RootLayout from "../layouts/RootLayout";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import Register from "../pages/Register";
import VerifyEmail from "../pages/VerifyEmail";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import UpdateProfile from "../pages/UpdateProfile";
import ChangePassword from "../pages/ChangePassword";
import ErrorPage from "../pages/ErrorPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Navigate to="/profile" replace />,
            },

            // Public Routes Group (Guest only)
            {
                element: <PublicRoute />,
                children: [
                    {
                        path: "register",
                        element: <Register />,
                    },
                    {
                        path: "verify-email",
                        element: <VerifyEmail />,
                    },
                    {
                        path: "login",
                        element: <Login />,
                    },
                    {
                        path: "forgot-password",
                        element: <ForgotPassword />,
                    },
                    {
                        path: "reset-password",
                        element: <ResetPassword />,
                    },
                ],
            },

            // Protected Routes Group (Auth only)
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "profile",
                        element: <Profile />,
                    },
                    {
                        path: "update-profile",
                        element: <UpdateProfile />,
                    },
                    {
                        path: "change-password",
                        element: <ChangePassword />,
                    },
                ],
            },
        ],
    },
]);