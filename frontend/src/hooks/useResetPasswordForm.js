import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    clearAuthMessages,
    resetPassword,
} from "../features/auth/authSlice";

export const useResetPasswordForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { resetEmail } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: resetEmail || "",
        otp: "",
        newPassword: "",
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
        const otp = formData.otp.trim();
        const newPassword = formData.newPassword;

        if (!email || !otp || !newPassword) {
            setFormError("All fields are required");
            return false;
        }

        if (otp.length !== 6) {
            setFormError("OTP must be 6 digits");
            return false;
        }

        if (newPassword.length < 6) {
            setFormError("New password must be at least 6 characters");
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
            resetPassword({
                email: formData.email.trim().toLowerCase(),
                otp: formData.otp.trim(),
                newPassword: formData.newPassword,
            })
        );

        if (resetPassword.fulfilled.match(result)) {
            navigate("/login");
        }
    };

    return {
        formData,
        formError,
        handleChange,
        handleSubmit,
    };
};
