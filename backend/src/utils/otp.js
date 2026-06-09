import bcrypt from "bcrypt";

export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const hashOtp = async (otp) => {
  return await bcrypt.hash(otp, 10);
};

export const compareOtp = async (otp, hashedOtp) => {
  return await bcrypt.compare(otp, hashedOtp);
};

export const generateOtpExpiry = () => {
  return new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
};