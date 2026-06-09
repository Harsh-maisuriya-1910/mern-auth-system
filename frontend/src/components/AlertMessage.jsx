import React from "react";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

export default function AlertMessage({ type = "error", message }) {
  if (!message) return null;

  const getAlertClass = () => {
    switch (type) {
      case "success":
        return "alert-success";
      case "info":
        return "alert-info";
      default:
        return "alert-error";
    }
  };

  const renderIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="alert-icon" size={18} />;
      case "info":
        return <Info className="alert-icon" size={18} />;
      default:
        return <AlertCircle className="alert-icon" size={18} />;
    }
  };

  return (
    <div className={`alert-box ${getAlertClass()} fade-in`}>
      {renderIcon()}
      <div className="alert-content">{message}</div>
    </div>
  );
}
