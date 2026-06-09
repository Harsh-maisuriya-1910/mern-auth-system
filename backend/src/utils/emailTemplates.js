export const emailVerificationTemplate = (username, otp) => {
  return `
    <div style="font-family: Arial, sans-serif;">
      <h2>Email Verification</h2>
      <p>Hello ${username},</p>
      <p>Your email verification OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP will expire in 10 minutes.</p>
      <p>If you did not create this account, please ignore this email.</p>
    </div>
  `;
};

export const resetPasswordTemplate = (username, otp) => {
  return `
    <div style="font-family: Arial, sans-serif;">
      <h2>Reset Password</h2>
      <p>Hello ${username},</p>
      <p>Your password reset OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP will expire in 10 minutes.</p>
      <p>If you did not request password reset, please ignore this email.</p>
    </div>
  `;
};