import { config_ENV } from "../config/config.js";

export const accessTokenCookieOptions = {
  httpOnly: true,
  secure: config_ENV.NODE_ENV === "production",
  sameSite: config_ENV.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 15 * 60 * 1000,
  path: "/",
};

export const refreshTokenCookieOptions = {
  httpOnly: true,
  secure: config_ENV.NODE_ENV === "production",
  sameSite: config_ENV.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
};

export const clearAccessTokenCookieOptions = {
  httpOnly: true,
  secure: config_ENV.NODE_ENV === "production",
  sameSite: config_ENV.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
};

export const clearRefreshTokenCookieOptions = {
  httpOnly: true,
  secure: config_ENV.NODE_ENV === "production",
  sameSite: config_ENV.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
};