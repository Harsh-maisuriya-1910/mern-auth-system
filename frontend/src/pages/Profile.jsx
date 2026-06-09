import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { User, Mail, Shield, ShieldCheck, Key, LogOut, Edit3, UserCheck, UserX } from "lucide-react";
import { useLogout } from "../hooks/useLogout";
import AlertMessage from "../components/AlertMessage";
import Badge from "../components/Badge";

export default function Profile() {
  const { handleLogout } = useLogout();
  const { user, loading, errorMessage } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="auth-layout-container">
        <div className="auth-card text-center" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "250px" }}>
          <svg className="btn-spinner text-indigo-600" style={{ width: "3rem", height: "3rem", color: "var(--accent)" }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 30" strokeLinecap="round" />
          </svg>
          <h2 style={{ marginTop: "1rem", color: "var(--text-primary)" }}>Loading profile data...</h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>Verifying secure server credentials</p>
        </div>
      </div>
    );
  }

  // Generate initials for avatar fallback
  const getInitials = () => {
    if (!user || !user.username) return "U";
    return user.username.substring(0, 2).toUpperCase();
  };

  return (
    <div className="auth-layout-container fade-in">
      <div className="auth-bg-decorations">
        <div className="auth-decor-circle-1"></div>
        <div className="auth-decor-circle-2"></div>
      </div>

      <div className="profile-card slide-up">
        {/* Cover graphic */}
        <div className="profile-cover"></div>

        {/* Profile Header Block */}
        <div className="profile-header-info">
          <div className="profile-avatar-wrapper">
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt="Avatar" className="profile-avatar-img" />
            ) : (
              <div className="profile-avatar-fallback">{getInitials()}</div>
            )}
          </div>

          <div className="profile-title-badges">
            <div className="profile-name-row">
              <h2 className="profile-name">{user?.username || "Developer Account"}</h2>
            </div>
            <p className="profile-email">{user?.email || "loading..."}</p>

            <div className="profile-badges-row">
              {user?.isVerified ? (
                <Badge type="verified">Verified Account</Badge>
              ) : (
                <Badge type="unverified">Unverified Email</Badge>
              )}
              <Badge type="role">{user?.role || "User"}</Badge>
            </div>
          </div>
        </div>

        {/* Profile Body Block */}
        <div className="profile-body">
          <AlertMessage type="error" message={errorMessage} />

          <h3 className="profile-section-title">Account Details</h3>

          {user && (
            <div className="profile-details-grid">
              <div className="profile-detail-card">
                <div className="profile-detail-label">Unique User ID</div>
                <div className="profile-detail-val" style={{ fontFamily: "var(--mono)", fontSize: "0.85rem" }}>
                  {user._id}
                </div>
              </div>

              <div className="profile-detail-card">
                <div className="profile-detail-label">Email Verified</div>
                <div className="profile-detail-val" style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                  {user.isVerified ? (
                    <>
                      <UserCheck size={16} className="text-emerald-500" style={{ color: "var(--success)" }} />
                      <span>Verified</span>
                    </>
                  ) : (
                    <>
                      <UserX size={16} style={{ color: "var(--warning)" }} />
                      <span>Pending OTP Validation</span>
                    </>
                  )}
                </div>
              </div>

              <div className="profile-detail-card">
                <div className="profile-detail-label">System Privileges</div>
                <div className="profile-detail-val" style={{ textTransform: "uppercase" }}>
                  {user.role} Member
                </div>
              </div>

              <div className="profile-detail-card">
                <div className="profile-detail-label">Session Protection</div>
                <div className="profile-detail-val" style={{ color: "var(--success)", fontWeight: "bold" }}>
                  JWT Cookie Secure
                </div>
              </div>
            </div>
          )}

          <div className="profile-actions-bar" style={{ marginTop: "2rem" }}>
            <Link to="/update-profile" className="btn btn-primary" style={{ flex: "1 1 200px" }}>
              <Edit3 size={16} />
              <span>Update Profile</span>
            </Link>

            <Link to="/change-password" className="btn btn-secondary" style={{ flex: "1 1 200px" }}>
              <Key size={16} />
              <span>Change Password</span>
            </Link>

            <button
              onClick={handleLogout}
              className="btn btn-secondary"
              style={{
                flex: "1 1 100%",
                borderColor: "rgba(239, 68, 68, 0.2)",
                color: "var(--error)",
                marginTop: "0.5rem",
              }}
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}