import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearAuthMessages,
  registerUser,
  setRegisteredEmail,
} from "../features/auth/authSlice";

export const useRegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
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
    const username = formData.username.trim();
    const email = formData.email.trim();
    const password = formData.password;

    if (!username || !email || !password) {
      setFormError("All fields are required");
      return false;
    }

    if (username.length < 3) {
      setFormError("Username must be at least 3 characters");
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

    const cleanEmail = formData.email.trim().toLowerCase();

    const result = await dispatch(
      registerUser({
        username: formData.username.trim(),
        email: cleanEmail,
        password: formData.password,
      })
    );

    if (registerUser.fulfilled.match(result)) {
      dispatch(setRegisteredEmail(cleanEmail));

      setFormData({
        username: "",
        email: "",
        password: "",
      });

      navigate("/verify-email");
    }
  };

  return {
    formData,
    formError,
    handleChange,
    handleSubmit,
  };
};