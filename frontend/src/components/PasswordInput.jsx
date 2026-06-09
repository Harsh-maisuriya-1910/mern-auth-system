import React, { useState, useEffect } from "react";
import { Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function PasswordInput({
  label,
  name,
  placeholder = "••••••••",
  value,
  onChange,
  error,
  showStrength = false,
  required = false,
  disabled = false,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const [strengthText, setStrengthText] = useState("");

  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    if (!value) {
      setStrength(0);
      setStrengthText("");
      return;
    }

    let score = 0;
    if (value.length >= 6) score++; // Length
    if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++; // Mixed case
    if (/[0-9]/.test(value)) score++; // Numbers
    if (/[^A-Za-z0-9]/.test(value)) score++; // Special character

    setStrength(score);

    switch (score) {
      case 0:
      case 1:
        setStrengthText("Weak");
        break;
      case 2:
        setStrengthText("Fair");
        break;
      case 3:
        setStrengthText("Good");
        break;
      case 4:
        setStrengthText("Strong");
        break;
      default:
        setStrengthText("");
    }
  }, [value]);

  const getStrengthClass = () => {
    return `strength-${strength}`;
  };

  const getStrengthColor = () => {
    switch (strength) {
      case 1: return "var(--error)";
      case 2: return "var(--warning)";
      case 3: return "#f59e0b";
      case 4: return "var(--success)";
      default: return "var(--text-muted)";
    }
  };

  return (
    <div className={`form-group ${error ? "has-error" : ""}`}>
      {label && (
        <label className="input-label" htmlFor={name}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="input-wrapper">
        <span className="input-icon-left">
          <Lock size={18} />
        </span>
        <input
          type={showPassword ? "text" : "password"}
          id={name}
          name={name}
          className="form-input form-input-with-icon form-input-with-toggle"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          {...props}
        />
        <button
          type="button"
          onClick={toggleVisibility}
          className="input-icon-right-btn"
          disabled={disabled}
          tabIndex="-1"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && (
        <p className="input-error-text">
          <AlertCircle size={14} className="alert-icon" />
          <span>{error}</span>
        </p>
      )}

      {showStrength && value && (
        <div className="password-strength-container fade-in">
          <div className={`password-strength-bars ${getStrengthClass()}`}>
            <div className="password-strength-segment"></div>
            <div className="password-strength-segment"></div>
            <div className="password-strength-segment"></div>
            <div className="password-strength-segment"></div>
          </div>
          <div className="password-strength-text">
            <span className="text-xs text-slate-500">Password strength:</span>
            <span style={{ color: getStrengthColor(), fontWeight: "bold" }}>
              {strengthText}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
