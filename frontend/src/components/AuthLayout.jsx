import React from "react";
import { Shield, CheckCircle, Lock } from "lucide-react";

export default function AuthLayout({ children, illustrationType = "security" }) {
  // Select illustration based on page type
  const renderIllustration = () => {
    switch (illustrationType) {
      case "otp":
        return (
          <svg className="auth-graphic-illustration animate-pulse" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="80" fill="rgba(255, 255, 255, 0.1)" />
            <rect x="50" y="60" width="100" height="80" rx="12" stroke="white" strokeWidth="6" fill="rgba(255,255,255,0.05)" />
            <line x1="70" y1="100" x2="130" y2="100" stroke="white" strokeWidth="6" strokeLinecap="round" strokeDasharray="1 12" />
            <rect x="85" y="110" width="30" height="20" rx="4" fill="white" />
            <path d="M100 40V60" stroke="#818cf8" strokeWidth="6" strokeLinecap="round" />
            <circle cx="100" cy="40" r="8" fill="#a5b4fc" />
          </svg>
        );
      case "forgot":
        return (
          <svg className="auth-graphic-illustration" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="80" fill="rgba(255, 255, 255, 0.1)" />
            <path d="M50 70C50 64.4772 54.4772 60 60 60H140C145.523 60 150 64.4772 150 70V130C150 135.523 145.523 140 140 140H60C54.4772 140 50 135.523 50 130V70Z" stroke="white" strokeWidth="6" fill="rgba(255,255,255,0.05)" />
            <path d="M55 70L92.5 98.125C96.9456 101.459 103.054 101.459 107.5 98.125L145 70" stroke="white" strokeWidth="6" strokeLinecap="round" />
            <circle cx="150" cy="60" r="14" fill="#ef4444" />
            <text x="146" y="65" fill="white" fontSize="14" fontWeight="bold">?</text>
          </svg>
        );
      default: // security / lock
        return (
          <svg className="auth-graphic-illustration" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="80" fill="rgba(255, 255, 255, 0.1)" />
            <path d="M100 45C125 50 145 60 145 60V110C145 142.5 125 157.5 100 165C75 157.5 55 142.5 55 110V60C55 60 75 50 100 45Z" fill="rgba(255, 255, 255, 0.05)" stroke="white" strokeWidth="6" strokeLinejoin="round" />
            <circle cx="100" cy="100" r="22" stroke="white" strokeWidth="5" />
            <path d="M100 122V132" stroke="white" strokeWidth="5" strokeLinecap="round" />
            <path d="M85 85H115" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="4" strokeLinecap="round" />
          </svg>
        );
    }
  };

  const getIllustrationTitle = () => {
    switch (illustrationType) {
      case "otp":
        return "Two-Factor Authentication";
      case "forgot":
        return "Recover Your Account";
      default:
        return "Enterprise Grade Security";
    }
  };

  const getIllustrationDesc = () => {
    switch (illustrationType) {
      case "otp":
        return "Enter the verification code sent to your registered email address to keep your session secure.";
      case "forgot":
        return "Don't worry! Just verify your email and we'll have you reset your password in no time.";
      default:
        return "Protect your identity and business data with end-to-end encrypted session controls and real-time monitoring.";
    }
  };

  return (
    <div className="auth-layout-container fade-in">
      <div className="auth-bg-decorations">
        <div className="auth-decor-circle-1"></div>
        <div className="auth-decor-circle-2"></div>
      </div>

      <div className="auth-split-screen slide-up">
        {/* Left Side Graphics Panel (Desktop only) */}
        <div className="auth-graphic-side">
          <div className="auth-graphic-content">
            {renderIllustration()}
            <h2>{getIllustrationTitle()}</h2>
            <p>{getIllustrationDesc()}</p>
          </div>

          <div className="auth-graphic-features">
            <div className="auth-feature-item">
              <Shield size={16} className="text-white" />
              <span>JWT & Session Cookie Authentication</span>
            </div>
            <div className="auth-feature-item">
              <Lock size={16} className="text-white" />
              <span>One-Time Password (OTP) Verification</span>
            </div>
            <div className="auth-feature-item">
              <CheckCircle size={16} className="text-white" />
              <span>Redux Toolkit Core State Management</span>
            </div>
          </div>
        </div>

        {/* Right Side Form Panel */}
        <div className="auth-split-form-container">
          {children}
        </div>
      </div>
    </div>
  );
}
