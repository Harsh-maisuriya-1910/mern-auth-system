import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../layouts/RootLayout";

import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

import Register from "../pages/Register";
import Login from "../pages/Login";
import VerifyEmail from "../pages/VerifyEmail";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

import Profile from "../pages/Profile";
import UpdateProfile from "../pages/UpdateProfile";
import ChangePassword from "../pages/ChangePassword";

import ErrorPage from "../pages/ErrorPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            // Default Route
            {
                index: true,
                element: <PublicRoute />,
                children: [
                    {
                        index: true,
                        element: <Login />,
                    },
                ],
            },

            // Public Routes
            {
                element: <PublicRoute />,
                children: [
                    {
                        path: "login",
                        element: <Login />,
                    },
                    {
                        path: "register",
                        element: <Register />,
                    },
                    {
                        path: "verify-email",
                        element: <VerifyEmail />,
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

            // Protected Routes
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