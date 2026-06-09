import dotenv from "dotenv";

dotenv.config();

export const config_ENV = {
    PORT: process.env.PORT || 5000,

    MONGO_URI: process.env.MONGO_URI,

    NODE_ENV: process.env.NODE_ENV || "development",

    CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",

    BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS) || 10,

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,

    ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m",
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",

    // Email configuration
    EMAIL_HOST: process.env.EMAIL_HOST || "smtp.gmail.com",
    EMAIL_PORT: Number(process.env.EMAIL_PORT) || 587,
    EMAIL_SECURE: process.env.EMAIL_SECURE === "true",

    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,

    EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME || "Authentication App",
    EMAIL_FROM_EMAIL: process.env.EMAIL_FROM_EMAIL || process.env.EMAIL_USER,
};