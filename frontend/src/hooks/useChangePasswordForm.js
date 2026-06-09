import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAuthMessages, changePassword } from "../features/auth/authSlice";

export const useChangePasswordForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        oldPassword: "",
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
        const { oldPassword, newPassword } = formData;

        if (!oldPassword || !newPassword) {
            setFormError("All fields are required");
            return false;
        }

        if (newPassword.length < 6) {
            setFormError("New password must be at least 6 characters");
            return false;
        }

        if (oldPassword === newPassword) {
            setFormError("New password must be different from old password");
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
            changePassword({
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword,
            })
        );

        if (changePassword.fulfilled.match(result)) {
            setFormData({
                oldPassword: "",
                newPassword: "",
            });
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
