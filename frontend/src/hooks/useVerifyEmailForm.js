import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    clearAuthMessages,
    resendOtp,
    verifyEmail,
} from "../features/auth/authSlice";

export const useVerifyEmailForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { registeredEmail } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: registeredEmail || "",
        otp: "",
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

        if (!email || !otp) {
            setFormError("Email and OTP are required");
            return false;
        }

        if (otp.length !== 6) {
            setFormError("OTP must be 6 digits");
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
            verifyEmail({
                email: formData.email.trim().toLowerCase(),
                otp: formData.otp.trim(),
            })
        );

        if (verifyEmail.fulfilled.match(result)) {
            navigate("/login");
        }
    };

    const handleResendOtp = async () => {
        dispatch(clearAuthMessages());
        setFormError("");

        if (!formData.email.trim()) {
            setFormError("Email is required to resend OTP");
            return;
        }

        await dispatch(
            resendOtp({
                email: formData.email.trim().toLowerCase(),
            })
        );
    };

    return {
        formData,
        formError,
        handleChange,
        handleSubmit,
        handleResendOtp,
    };
};