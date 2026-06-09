import React from "react";
import { AlertCircle } from "lucide-react";

export default function InputField({
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  required = false,
  disabled = false,
  ...props
}) {
  return (
    <div className={`form-group ${error ? "has-error" : ""}`}>
      {label && (
        <label className="input-label" htmlFor={name}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="input-wrapper">
        {Icon && (
          <span className="input-icon-left">
            <Icon size={18} />
          </span>
        )}
        <input
          type={type}
          id={name}
          name={name}
          className={`form-input ${Icon ? "form-input-with-icon" : ""}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          {...props}
        />
      </div>
      {error && (
        <p className="input-error-text">
          <AlertCircle size={14} className="alert-icon" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
