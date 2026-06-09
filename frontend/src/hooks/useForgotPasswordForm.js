import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    clearAuthMessages,
    forgotPassword,
    setResetEmail,
} from "../features/auth/authSlice";

export const useForgotPasswordForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [formError, setFormError] = useState("");

    const handleChange = (e) => {
        setEmail(e.target.value);
        setFormError("");
        dispatch(clearAuthMessages());
    };

    const validateForm = () => {
        const cleanEmail = email.trim();
        if (!cleanEmail) {
            setFormError("Email is required");
            return false;
        }
        if (!cleanEmail.includes("@")) {
            setFormError("Please enter a valid email");
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

        const cleanEmail = email.trim().toLowerCase();
        const result = await dispatch(forgotPassword({ email: cleanEmail }));

        if (forgotPassword.fulfilled.match(result)) {
            dispatch(setResetEmail(cleanEmail));
            setEmail("");
            navigate("/reset-password");
        }
    };

    return {
        email,
        formError,
        handleChange,
        handleSubmit,
    };
};
