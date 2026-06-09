import React, { useRef, useEffect } from "react";

export default function OTPInput({
  value = "",
  onChange,
  name = "otp",
  length = 6,
  disabled = false,
}) {
  const inputsRef = useRef([]);

  // Split value into array
  const otpArray = value.split("").slice(0, length);
  while (otpArray.length < length) {
    otpArray.push("");
  }

  // Focus on the first empty input or the first one if reset
  useEffect(() => {
    if (inputsRef.current[0] && value === "") {
      inputsRef.current[0].focus();
    }
  }, [value]);

  const focusInput = (index) => {
    if (inputsRef.current[index]) {
      inputsRef.current[index].focus();
    }
  };

  const handleInputChange = (e, index) => {
    const val = e.target.value;
    if (!val) return; // Managed by onKeyDown (Backspace)

    // Take only the last character entered
    const digit = val.substring(val.length - 1);
    
    // Only accept numeric digits
    if (!/^\d$/.test(digit)) return;

    const newOtpArray = [...otpArray];
    newOtpArray[index] = digit;
    const combinedOtp = newOtpArray.join("");

    // Trigger state change
    onChange({
      target: {
        name,
        value: combinedOtp,
      },
    });

    // Shift focus forward
    if (index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtpArray = [...otpArray];
      
      // If current input is empty, clear the previous one and focus it
      if (!newOtpArray[index] && index > 0) {
        newOtpArray[index - 1] = "";
        const combinedOtp = newOtpArray.join("");
        
        onChange({
          target: {
            name,
            value: combinedOtp,
          },
        });
        
        focusInput(index - 1);
      } else {
        // Just clear the current input
        newOtpArray[index] = "";
        const combinedOtp = newOtpArray.join("");
        
        onChange({
          target: {
            name,
            value: combinedOtp,
          },
        });
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    if (disabled) return;

    const pastedText = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(pastedText)) return; // Only accept digits

    const digits = pastedText.substring(0, length);
    
    onChange({
      target: {
        name,
        value: digits,
      },
    });

    // Focus on last input or input matching length
    const focusIndex = Math.min(digits.length, length - 1);
    focusInput(focusIndex);
  };

  return (
    <div className="otp-box-container">
      <div className="otp-inputs-row" onPaste={handlePaste}>
        {otpArray.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={2}
            value={digit}
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            disabled={disabled}
            className="otp-input-field"
            placeholder="-"
          />
        ))}
      </div>
    </div>
  );
}
