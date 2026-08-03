import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
    }, [dispatch, authChecked]);

    // Wait until authentication finishes
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

    // Already logged in
    if (isAuthenticated) {
        return <Navigate to="/profile" replace />;
    }

    // Guest user
    return <Outlet />;
}