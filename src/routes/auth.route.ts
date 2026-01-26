import express from "express";
import AuthController from "../controllers/auth.controller.js";

export const authRoute = express.Router();

authRoute.get("/health", AuthController.health);

authRoute.post("/register", AuthController.register);

authRoute.post("/verify-email", AuthController.verifyEmail);

authRoute.post("/resend-verification", AuthController.resendVerification);

authRoute.post("/login", AuthController.login);

authRoute.post("/refresh", AuthController.refresh);

authRoute.post("/forgot-password", AuthController.forgotPassword);

authRoute.post("/reset-password", AuthController.resetPassword);

authRoute.post("/logout", AuthController.logout);
