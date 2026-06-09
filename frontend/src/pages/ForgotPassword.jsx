import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, Send } from "lucide-react";
import { useForgotPasswordForm } from "../hooks/useForgotPasswordForm";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import AlertMessage from "../components/AlertMessage";

export default function ForgotPassword() {
  const { email, formError, handleChange, handleSubmit } = useForgotPasswordForm();
  const { loading, successMessage, errorMessage } = useSelector(
    (state) => state.auth
  );

  return (
    <AuthLayout illustrationType="forgot">
      <div className="fade-in">
        <div className="auth-header">
          <div className="auth-header-logo">
            <Mail size={22} />
          </div>
          <h1>Forgot Password</h1>
          <p>
            Enter your verified email address and we'll send you a 6-digit OTP code to reset your password.
          </p>
        </div>

        {/* Action alerts */}
        <AlertMessage type="error" message={formError || errorMessage} />
        <AlertMessage type="success" message={successMessage} />

        {/* If the OTP was sent successfully, show a helpful link to Reset Password */}
        {successMessage && (
          <div className="alert-box alert-info" style={{ marginBottom: "1.5rem" }}>
            <span>Ready to reset? </span>
            <Link to="/reset-password" className="auth-link" style={{ textDecoration: "underline" }}>
              Proceed to Reset Password
            </Link>
          </div>
        )}

        <form onSubmit={handleSubmit} className="slide-up">
          <InputField
            label="Email Address"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={email}
            onChange={handleChange}
            icon={Mail}
            required
            disabled={loading}
          />

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ marginTop: "1rem" }}
          >
            {loading ? (
              <>
                <svg className="btn-spinner" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeDasharray="30 30" strokeLinecap="round" />
                </svg>
                <span>Sending OTP...</span>
              </>
            ) : (
              <>
                <Send size={16} />
                <span>Send Reset OTP</span>
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
