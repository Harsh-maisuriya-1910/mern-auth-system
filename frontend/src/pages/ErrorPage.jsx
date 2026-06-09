import React from "react";
import { Link } from "react-router-dom";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function ErrorPage() {
  return (
    <div className="auth-layout-container fade-in">
      <div className="auth-bg-decorations">
        <div className="auth-decor-circle-1"></div>
        <div className="auth-decor-circle-2"></div>
      </div>

      <div className="error-page-container slide-up" style={{ zIndex: 1 }}>
        <svg className="error-illustration" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="80" fill="rgba(239, 68, 68, 0.05)" />
          <path d="M100 40C120 45 140 55 140 55V105C140 132 120 148 100 155C80 148 60 132 60 105V55C60 55 80 45 100 40Z" fill="rgba(239, 68, 68, 0.08)" stroke="var(--error)" strokeWidth="6" strokeLinejoin="round" />
          <path d="M100 80V110" stroke="var(--error)" strokeWidth="6" strokeLinecap="round" />
          <circle cx="100" cy="125" r="4.5" fill="var(--error)" />
        </svg>

        <h2 className="error-title">Oops! Page Not Found</h2>
        <p className="error-desc">
          The security certificate or endpoint path you requested could not be resolved. It might have been relocated or does not exist.
        </p>
        
        <Link 
          to="/" 
          className="btn btn-primary" 
          style={{ 
            maxWidth: "240px", 
            margin: "0 auto",
            boxShadow: "0 4px 12px rgba(239, 68, 68, 0.15)",
            background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)"
          }}
        >
          <ArrowLeft size={16} />
          <span>Go back to safety</span>
        </Link>
      </div>
    </div>
  );
}
