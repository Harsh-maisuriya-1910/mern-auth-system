import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PublicRoute() {
    const { isAuthenticated, authChecked } = useSelector(
        (state) => state.auth
    );

    if (!authChecked) {
        return <h2>Checking authentication...</h2>;
    }

    if (isAuthenticated) {
        return <Navigate to="/profile" replace />;
    }

    return <Outlet />;
}