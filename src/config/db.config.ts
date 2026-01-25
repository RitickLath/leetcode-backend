import mongoose from "mongoose";
import { env } from "./env.config.js";

export const connectDatabase = async (): Promise<void> => {
  try {
    if (!env.MONGO_URI) {
      console.warn("Skipping database connection (MONGO_URI not configured)");
      return;
    }

    await mongoose.connect(env.MONGO_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Failed to connect to database:", error);
    throw error;
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error closing database connection:", error);
    throw error;
  }
};

export default { connectDatabase, disconnectDatabase };
