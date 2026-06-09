import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, FileText, Camera, Save, X } from "lucide-react";
import { useUpdateProfileForm } from "../hooks/useUpdateProfileForm";
import { clearAuthMessages } from "../features/auth/authSlice";
import AlertMessage from "../components/AlertMessage";
import InputField from "../components/InputField";

export default function UpdateProfile() {
  const { username, formError, handleChange, handleSubmit } = useUpdateProfileForm();
  const { user, loading, successMessage, errorMessage } = useSelector(
    (state) => state.auth
  );
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Local state for mock features (avatar picker & biography)
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [bio, setBio] = useState("SaaS Product Designer & Fullstack Engineer. Interested in cybersecurity, React development, and modern user experience patterns.");
  
  // Track if form was actively submitted in this session to prevent immediate stale redirect
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Clear messages when page mounts or unmounts
  useEffect(() => {
    dispatch(clearAuthMessages());
    return () => {
      dispatch(clearAuthMessages());
    };
  }, [dispatch]);

  // Update initials or image state
  const getInitials = () => {
    if (username) return username.substring(0, 2).toUpperCase();
    return user?.username ? user.username.substring(0, 2).toUpperCase() : "U";
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLocalSubmit = (e) => {
    setIsSubmitted(true);
    handleSubmit(e);
  };

  // If successfully updated, redirect back to profile page after 1.5 seconds
  useEffect(() => {
    if (successMessage && isSubmitted) {
      const timer = setTimeout(() => {
        navigate("/profile");
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

      <div className="auth-card slide-up" style={{ maxWidth: "580px" }}>
        <div className="auth-header">
          <h1>Update Profile</h1>
          <p>Modify your public profile details and custom avatar representation</p>
        </div>

        {/* Status alerts */}
        <AlertMessage type="error" message={formError || errorMessage} />
        <AlertMessage type="success" message={successMessage} />

        <form onSubmit={handleLocalSubmit}>
          {/* Avatar upload layout */}
          <div className="avatar-upload-container">
            <div className="avatar-upload-preview">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Preview" className="profile-avatar-img" />
              ) : user?.avatarUrl ? (
                <img src={user.avatarUrl} alt="Avatar" className="profile-avatar-img" />
              ) : (
                <div className="profile-avatar-fallback" style={{ fontSize: "2rem" }}>{getInitials()}</div>
              )}
            </div>
            
            <div>
              <label className="avatar-upload-label" htmlFor="avatar-file">
                <Camera size={14} style={{ display: "inline", marginRight: "0.25rem", verticalAlign: "middle" }} />
                <span>Upload New Avatar</span>
              </label>
              <input
                id="avatar-file"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="avatar-file-input"
                disabled={loading}
              />
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.375rem" }}>
                Supports JPG, PNG or GIF. Max size 2MB.
              </p>
            </div>
          </div>

          <InputField
            label="Name / Username"
            type="text"
            name="username"
            placeholder="Enter username"
            value={username}
            onChange={handleChange}
            icon={User}
            required
            disabled={loading}
          />

          <InputField
            label="Email Address (Linked to Account)"
            type="email"
            name="email"
            value={user?.email || ""}
            icon={Mail}
            disabled={true} // Email should be non-editable for safety
          />

          <div className="form-group">
            <label className="input-label">Biography</label>
            <div className="input-wrapper">
              <span className="input-icon-left" style={{ top: "0.75rem", alignSelf: "flex-start", marginTop: "0.25rem" }}>
                <FileText size={18} />
              </span>
              <textarea
                className="form-input form-input-with-icon"
                rows="4"
                placeholder="Tell us about yourself..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                disabled={loading}
                style={{ resize: "none", height: "auto", paddingLeft: "2.75rem" }}
              />
            </div>
          </div>

          <div className="profile-actions-bar" style={{ marginTop: "2rem" }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ flex: "1 1 120px" }}
            >
              {loading ? (
                <>
                  <svg className="btn-spinner" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeDasharray="30 30" strokeLinecap="round" />
                  </svg>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Save Changes</span>
                </>
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
