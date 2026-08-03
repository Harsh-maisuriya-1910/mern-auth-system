import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMe } from "../features/auth/authSlice";

export default function RootLayout() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    return <Outlet />;
}