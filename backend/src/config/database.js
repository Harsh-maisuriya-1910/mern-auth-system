import mongoose from "mongoose";
import { config_ENV } from "./config.js";


export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(config_ENV.MONGO_URI);

        console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};