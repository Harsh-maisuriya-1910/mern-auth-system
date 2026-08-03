import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PublicRoute() {
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

    // Already logged in
    if (isAuthenticated) {
        return <Navigate to="/profile" replace />;
    }

    return <Outlet />;
}