import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { KeyRound, ArrowLeft, RefreshCw, Timer } from "lucide-react";
import { useVerifyEmailForm } from "../hooks/useVerifyEmailForm";
import AuthLayout from "../components/AuthLayout";
import OTPInput from "../components/OTPInput";
import AlertMessage from "../components/AlertMessage";

export default function VerifyEmail() {
  const {
    formData,
    formError,
    handleChange,
    handleSubmit,
    handleResendOtp,
  } = useVerifyEmailForm();

  const { loading, successMessage, errorMessage } = useSelector(
    (state) => state.auth
  );

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleResend = async () => {
    if (!canResend || loading) return;
    await handleResendOtp();
    setTimeLeft(60);
    setCanResend(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <AuthLayout illustrationType="otp">
      <div className="fade-in">
        <div className="auth-header">
          <div className="auth-header-logo">
            <KeyRound size={22} />
          </div>
          <h1>Security Verification</h1>
          <p>
            We've sent a 6-digit OTP code to the email address:
            <br />
            <strong className="text-indigo-600" style={{ color: "var(--accent)", display: "inline-block", marginTop: "0.25rem" }}>
              {formData.email || "your email"}
            </strong>
          </p>
        </div>

        {/* Action alerts */}
        <AlertMessage type="error" message={formError || errorMessage} />
        <AlertMessage type="success" message={successMessage} />

        <form onSubmit={handleSubmit} className="slide-up">
          {/* OTP Custom Input Field Row */}
          <OTPInput
            value={formData.otp}
            onChange={handleChange}
            name="otp"
            length={6}
            disabled={loading}
          />

          <div className="otp-timer-row" style={{ marginBottom: "2rem" }}>
            <div className="otp-timer">
              <Timer size={14} />
              <span>Expires in:</span>
              <span className="otp-timer-count">{formatTime(timeLeft)}</span>
            </div>

            <button
              type="button"
              onClick={handleResend}
              disabled={!canResend || loading}
              className="auth-link"
              style={{
                background: "none",
                border: "none",
                cursor: canResend ? "pointer" : "not-allowed",
                opacity: canResend ? 1 : 0.5,
                fontSize: "0.85rem",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
              <span>Resend OTP</span>
            </button>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || formData.otp.length !== 6}
          >
            {loading ? (
              <>
                <svg className="btn-spinner" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeDasharray="30 30" strokeLinecap="round" />
                </svg>
                <span>Verifying...</span>
              </>
            ) : (
              <span>Verify Code</span>
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