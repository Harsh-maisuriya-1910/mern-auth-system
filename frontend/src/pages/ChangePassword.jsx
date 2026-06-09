import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ShieldAlert, ArrowLeft, KeyRound, X } from "lucide-react";
import { useChangePasswordForm } from "../hooks/useChangePasswordForm";
import { clearAuthMessages } from "../features/auth/authSlice";
import AlertMessage from "../components/AlertMessage";
import PasswordInput from "../components/PasswordInput";
import InputField from "../components/InputField";

export default function ChangePassword() {
  const { formData, formError, handleChange, handleSubmit } = useChangePasswordForm();
  const { loading, successMessage, errorMessage } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Clear messages when page mounts or unmounts
  useEffect(() => {
    dispatch(clearAuthMessages());
    return () => {
      dispatch(clearAuthMessages());
    };
  }, [dispatch]);

  const handleChangeSubmit = (e) => {
    e.preventDefault();
    setLocalError("");

    // Password confirmation match
    if (formData.newPassword !== confirmPassword) {
      setLocalError("New passwords do not match");
      return;
    }

    if (formData.newPassword.length < 6) {
      setLocalError("New password must be at least 6 characters long");
      return;
    }

    if (formData.oldPassword === formData.newPassword) {
      setLocalError("New password cannot be the same as old password");
      return;
    }

    setIsSubmitted(true);
    handleSubmit(e);
  };

  // If password successfully updated, navigate back to profile after 1.5 seconds
  useEffect(() => {
    if (successMessage && isSubmitted) {
      const timer = setTimeout(() => {
        navigate("/login"); // Note: backend logs user out on password update (isAuthenticated false), so they go to login
        setIsSubmitted(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [successMessage, isSubmitted, navigate]);

  return (
    <div className="auth-layout-container fade-in">
      <div className="auth-bg-decorations">
        <div className="auth-decor-circle-1"></div>
        <div className="auth-decor-circle-2"></div>
      </div>

      <div className="auth-card slide-up">
        <div className="auth-header">
          <div className="auth-header-logo">
            <KeyRound size={22} />
          </div>
          <h1>Change Password</h1>
          <p>Update your credentials to maintain secure SaaS account access</p>
        </div>

        {/* Action alerts */}
        <AlertMessage type="error" message={localError || formError || errorMessage} />
        <AlertMessage type="success" message={successMessage} />

        {successMessage && (
          <div className="alert-box alert-info" style={{ marginBottom: "1.5rem" }}>
            <span>Password updated! Redirecting to login page...</span>
          </div>
        )}

        <form onSubmit={handleChangeSubmit}>
          <PasswordInput
            label="Current Password"
            name="oldPassword"
            placeholder="Enter current password"
            value={formData.oldPassword}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <PasswordInput
            label="New Password"
            name="newPassword"
            placeholder="Minimum 6 characters"
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

          <div className="profile-actions-bar" style={{ marginTop: "2rem" }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || !formData.oldPassword || !formData.newPassword || !confirmPassword}
              style={{ flex: "1 1 120px" }}
            >
              {loading ? (
                <>
                  <svg className="btn-spinner" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeDasharray="30 30" strokeLinecap="round" />
                  </svg>
                  <span>Updating...</span>
                </>
              ) : (
                <span>Update Password</span>
              )}
            </button>

            <Link
              to="/profile"
              className="btn btn-secondary"
              style={{ flex: "1 1 120px" }}
            >
              <X size={16} />
              <span>Cancel</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

// Fallback lock icon
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
