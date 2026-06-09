import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username cannot exceed 30 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter valid email"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    verifyOtp: {
      type: String,
      default: "",
      select: false,
    },

    verifyOtpExpireAt: {
      type: Date,
      default: null,
      select: false,
    },

    refreshToken: {
      type: String,
      default: "",
      select: false,
    },

    resetOtp: {
      type: String,
      default: "",
      select: false,
    },

    resetOtpExpireAt: {
      type: Date,
      default: null,
      select: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);