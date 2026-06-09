import React from "react";
import { Check, AlertTriangle, ShieldCheck } from "lucide-react";

export default function Badge({ type = "role", children }) {
  const getBadgeClass = () => {
    switch (type) {
      case "verified":
        return "badge-verified";
      case "unverified":
        return "badge-unverified";
      default:
        return "badge-role";
    }
  };

  const renderIcon = () => {
    switch (type) {
      case "verified":
        return <Check size={12} />;
      case "unverified":
        return <AlertTriangle size={12} />;
      case "role":
        return <ShieldCheck size={12} />;
      default:
        return null;
    }
  };

  return (
    <span className={`badge ${getBadgeClass()}`}>
      {renderIcon()}
      {children}
    </span>
  );
}
