// CHANGE APPLIED: This component was created to protect guest routes (Register, Login, Forgot Password, Reset Password).
// If a user is already authenticated, accessing a guest route redirects them to their profile page.
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getMe } from "../features/auth/authSlice";

export default function PublicRoute() {
    const dispatch = useDispatch();
    const { isAuthenticated, authChecked, loading } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (!authChecked) {
            dispatch(getMe());
        }
    }, [authChecked, dispatch]);

    if (loading || !authChecked) {
        return <h2>Checking authentication...</h2>;
    }

    if (isAuthenticated) {
        return <Navigate to="/profile" replace />;
    }

    return <Outlet />;
}
