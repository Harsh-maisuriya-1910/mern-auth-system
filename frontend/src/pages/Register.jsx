import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { User, Mail, UserPlus } from "lucide-react";
import { useRegisterForm } from "../hooks/useRegisterForm";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import PasswordInput from "../components/PasswordInput";
import AlertMessage from "../components/AlertMessage";

export default function Register() {
  const { formData, formError, handleChange, handleSubmit } = useRegisterForm();
  const { loading, successMessage, errorMessage } = useSelector(
    (state) => state.auth
  );

  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setLocalError("");

    // Password matching validation
    if (formData.password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    // Terms of service check
    if (!termsAccepted) {
      setLocalError("You must agree to the Terms of Service & Privacy Policy");
      return;
    }

    // Propagate to Redux form submit hook
    handleSubmit(e);
  };

  return (
    <AuthLayout illustrationType="security">
      <div className="fade-in">
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Get started with your secure SaaS developer sandbox</p>
        </div>

        {/* Display feedback alerts */}
        <AlertMessage type="error" message={localError || formError || errorMessage} />
        <AlertMessage type="success" message={successMessage} />

        <form onSubmit={handleRegisterSubmit} className="slide-up">
          <InputField
            label="Name / Username"
            type="text"
            name="username"
            placeholder="johndoe"
            value={formData.username}
            onChange={handleChange}
            icon={User}
            required
            disabled={loading}
          />

          <InputField
            label="Email Address"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            icon={Mail}
            required
            disabled={loading}
          />

          <PasswordInput
            label="Password"
            name="password"
            placeholder="Minimum 6 characters"
            value={formData.password}
            onChange={handleChange}
            showStrength={true}
            required
            disabled={loading}
          />

          <InputField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setLocalError("");
            }}
            icon={LockIconFallback}
            required
            disabled={loading}
          />

          <div className="form-group" style={{ marginBottom: "1.5rem" }}>
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => {
                  setTermsAccepted(e.target.checked);
                  setLocalError("");
                }}
                className="checkbox-input"
                disabled={loading}
              />
              <span className="checkbox-label" style={{ fontSize: "0.85rem" }}>
                I agree to the{" "}
                <a href="#terms" className="auth-link" onClick={(e) => e.preventDefault()}>
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#privacy" className="auth-link" onClick={(e) => e.preventDefault()}>
                  Privacy Policy
                </a>
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="btn-spinner" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeDasharray="30 30" strokeLinecap="round" />
                </svg>
                <span>Creating account...</span>
              </>
            ) : (
              <>
                <UserPlus size={18} />
                <span>Create Account</span>
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-sm" style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.9rem" }}>
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Log in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

// Minimal fallback inline icon to avoid loading multiple duplicates of Lucide icons if not needed
function LockIconFallback(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}