import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Shield, User, Key, LogOut, FileEdit, UserCheck } from "lucide-react";
import { useLogout } from "../hooks/useLogout";

export const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { handleLogout } = useLogout();

  // Generate initials for avatar fallback
  const getInitials = () => {
    if (!user || !user.username) return "U";
    return user.username.substring(0, 2).toUpperCase();
  };

  return (
    <header className="navbar-container">
      <nav className="navbar-inner">
        {/* Brand Logo & Name */}
        <NavLink to="/" className="navbar-brand">
          <Shield className="navbar-brand-logo" size={24} strokeWidth={2.5} />
          <span>SecureAuth</span>
        </NavLink>

        {/* Navigation Actions Menu */}
        <ul className="navbar-menu">
          {!isAuthenticated ? (
            <>
              <li>
                <NavLink to="/register" className="nav-link-custom">
                  Sign Up
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className="nav-link-custom">
                  Sign In
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/profile" className="nav-link-custom">
                  <User size={15} />
                  <span>Profile</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/update-profile" className="nav-link-custom">
                  <FileEdit size={15} />
                  <span>Settings</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/change-password" className="nav-link-custom">
                  <Key size={15} />
                  <span>Security</span>
                </NavLink>
              </li>
              
              {/* User Avatar & Logout */}
              <li style={{ display: "flex", alignItems: "center", gap: "0.75rem", borderLeft: "1.5px solid var(--border-color)", paddingLeft: "1rem" }}>
                <div 
                  style={{ 
                    width: "2rem", 
                    height: "2rem", 
                    borderRadius: "50%", 
                    backgroundColor: "var(--accent)", 
                    color: "white", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                    boxShadow: "var(--shadow-sm)"
                  }}
                  title={user?.username || "Logged in"}
                >
                  {getInitials()}
                </div>
                
                <button 
                  type="button" 
                  onClick={handleLogout} 
                  className="nav-btn-logout"
                  title="Sign Out"
                >
                  <LogOut size={15} />
                  <span style={{ display: "none" }}>Logout</span>
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
