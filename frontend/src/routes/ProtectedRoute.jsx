import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

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
    }, [authChecked, dispatch]);

    if (loading || !authChecked) {
        return <h2>Checking authentication...</h2>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
}