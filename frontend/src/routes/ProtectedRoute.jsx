import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getMe } from "../features/auth/authSlice";

export default function ProtectedRoute() {
    const dispatch = useDispatch();
    const location = useLocation();

    const { isAuthenticated, authChecked, loading } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (!authChecked) {
            dispatch(getMe());
        }
    }, [dispatch, authChecked]);

    // Wait until authentication check completes
    if (!authChecked || loading) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "grid",
                    placeItems: "center",
                    fontSize: "18px",
                    fontWeight: 500,
                }}
            >
                Checking authentication...
            </div>
        );
    }

    // User is not logged in
    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    // User is authenticated
    return <Outlet />;
}