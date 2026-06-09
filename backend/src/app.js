import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import { config_ENV } from "./config/config.js";
import { authRouter } from "./routes/auth.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

export const app = express();

app.use(
  cors({
    origin: config_ENV.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Authentication API is running",
  });
});

app.use("/api/auth", authLimiter, authRouter);

app.use(errorMiddleware);