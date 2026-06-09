import jwt from "jsonwebtoken";
import { config_ENV } from "../config/config.js";

export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    config_ENV.ACCESS_TOKEN_SECRET,
    {
      expiresIn: config_ENV.ACCESS_TOKEN_EXPIRES_IN || "15m",
    }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
    },
    config_ENV.REFRESH_TOKEN_SECRET,
    {
      expiresIn: config_ENV.REFRESH_TOKEN_EXPIRES_IN || "7d",
    }
  );
};