import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthMessages, updateProfile } from "../features/auth/authSlice";

export const useUpdateProfileForm = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const [username, setUsername] = useState(user?.username || "");
    const [formError, setFormError] = useState("");

    useEffect(() => {
        if (user?.username) {
            setUsername(user.username);
        }
    }, [user]);

    const handleChange = (e) => {
        setUsername(e.target.value);
        setFormError("");
        dispatch(clearAuthMessages());
    };

    const validateForm = () => {
        const cleanUsername = username.trim();
        if (!cleanUsername) {
            setFormError("Username is required");
            return false;
        }
        if (cleanUsername.length < 3) {
            setFormError("Username must be at least 3 characters");
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

        await dispatch(
            updateProfile({
                username: username.trim(),
            })
        );
    };

    return {
        username,
        formError,
        handleChange,
        handleSubmit,
    };
};
