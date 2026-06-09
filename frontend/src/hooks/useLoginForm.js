import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { clearAuthMessages, loginUser } from "../features/auth/authSlice";

export const useLoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const redirectPath = location.state?.from?.pathname || "/profile";

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [formError, setFormError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setFormError("");
        dispatch(clearAuthMessages());
    };

    const validateForm = () => {
        const email = formData.email.trim();
        const password = formData.password;

        if (!email || !password) {
            setFormError("Email and password are required");
            return false;
        }

        if (!email.includes("@")) {
            setFormError("Please enter a valid email");
            return false;
        }

        if (password.length < 6) {
            setFormError("Password must be at least 6 characters");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(clearAuthMessages());
        setFormError("");

        const isValid = validateForm();

        if (!isValid) return;

        const result = await dispatch(
            loginUser({
                email: formData.email.trim().toLowerCase(),
                password: formData.password,
            })
        );

        if (loginUser.fulfilled.match(result)) {
            setFormData({
                email: "",
                password: "",
            });

            navigate(redirectPath, { replace: true });
        }
    };

    return {
        formData,
        formError,
        handleChange,
        handleSubmit,
    };
};