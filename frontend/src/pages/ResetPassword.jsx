import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ShieldAlert, ArrowLeft, Check, X, RefreshCw } from "lucide-react";
import { useResetPasswordForm } from "../hooks/useResetPasswordForm";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import PasswordInput from "../components/PasswordInput";
import AlertMessage from "../components/AlertMessage";

export default function ResetPassword() {
  const { formData, formError, handleChange, handleSubmit } = useResetPasswordForm();
  const { loading, successMessage, errorMessage } = useSelector(
    (state) => state.auth
  );

  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const handleResetSubmit = (e) => {
    e.preventDefault();
    setLocalError("");

    if (formData.newPassword !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    if (formData.newPassword.length < 6) {
      setLocalError("New password must be at least 6 characters long");
      return;
    }

    handleSubmit(e);
  };

  // Live rule checks
  const pass = formData.newPassword || "";
  const rules = {
    length: pass.length >= 6,
    number: /\d/.test(pass),
    special: /[^A-Za-z0-9]/.test(pass),
    casing: /[A-Z]/.test(pass) && /[a-z]/.test(pass),
  };

  return (
    <AuthLayout illustrationType="security">
      <div className="fade-in">
        <div className="auth-header">
          <div className="auth-header-logo">
            <ShieldAlert size={22} />
          </div>
          <h1>Reset Password</h1>
          <p>Create a secure new password for your account</p>
        </div>

        {/* Display feedback alerts */}
        <AlertMessage type="error" message={localError || formError || errorMessage} />
        <AlertMessage type="success" message={successMessage} />

        {successMessage && (
          <div className="alert-box alert-info" style={{ marginBottom: "1.5rem" }}>
            <span>Password updated successfully! </span>
            <Link to="/login" className="auth-link" style={{ textDecoration: "underline" }}>
              Proceed to Login
            </Link>
          </div>
        )}

        <form onSubmit={handleResetSubmit} className="slide-up">
          <InputField
            label="Registered Email Address"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            icon={MailIconFallback}
            required
            disabled={loading}
          />

          <InputField
            label="6-Digit OTP Code"
            type="text"
            name="otp"
            placeholder="Enter code"
            maxLength={6}
            value={formData.otp}
            onChange={handleChange}
            icon={KeyIconFallback}
            required
            disabled={loading}
          />

          <PasswordInput
            label="New Password"
            name="newPassword"
            placeholder="Enter new password"
            value={formData.newPassword}
            onChange={handleChange}
            showStrength={true}
            required
            disabled={loading}
          />

          <InputField
            label="Confirm New Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setLocalError("");
            }}
            icon={LockIconFallback}
            required
            disabled={loading}
          />

          {/* Password complexity checklist */}
          <div className="password-rules" style={{ marginBottom: "1.5rem" }}>
            <p className="password-rules-title">Security Requirements:</p>
            <div className={`password-rule-item ${rules.length ? "valid" : ""}`}>
              {rules.length ? <Check size={12} /> : <X size={12} />}
              <span>At least 6 characters</span>
            </div>
            <div className={`password-rule-item ${rules.casing ? "valid" : ""}`}>
              {rules.casing ? <Check size={12} /> : <X size={12} />}
              <span>Mixed case letters (a-z & A-Z)</span>
            </div>
            <div className={`password-rule-item ${rules.number ? "valid" : ""}`}>
              {rules.number ? <Check size={12} /> : <X size={12} />}
              <span>At least one number (0-9)</span>
            </div>
            <div className={`password-rule-item ${rules.special ? "valid" : ""}`}>
              {rules.special ? <Check size={12} /> : <X size={12} />}
              <span>At least one special character (!@#$)</span>
            </div>
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
                <span>Resetting password...</span>
              </>
            ) : (
              <>
                <RefreshCw size={16} />
                <span>Reset Password</span>
              </>
            )}
          </button>
        </form>

        <div className="text-center" style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <Link
            to="/login"
            className="auth-link"
            style={{
              fontSize: "0.9rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to login</span>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}

// Fallback Icons
function MailIconFallback(props) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function KeyIconFallback(props) {
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
      <path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 1.5 1.5M15.5 7.5 14 6" />
    </svg>
  );
}

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
