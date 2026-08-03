import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute() {
    const location = useLocation();

    const {
        loading,
        authChecked,
        isAuthenticated,
    } = useSelector((state) => state.auth);

    // Wait until authentication check finishes
    if (loading || !authChecked) {
        return (
            <div className="auth-loading">
                <h2>Checking authentication...</h2>
            </div>
        );
    }

    // User not logged in
    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    // User authenticated
    return <Outlet />;
}