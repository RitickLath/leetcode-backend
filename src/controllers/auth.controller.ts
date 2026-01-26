import { type Request, type Response } from "express";

const health = async (req: Request, res: Response) => {
  res.json({ message: "OK" });
};

const register = async (req: Request, res: Response) => {};

const verifyEmail = async (req: Request, res: Response) => {};

const resendVerification = async (req: Request, res: Response) => {};

const login = async (req: Request, res: Response) => {};

const refresh = async (req: Request, res: Response) => {};

const forgotPassword = async (req: Request, res: Response) => {};

const resetPassword = async (req: Request, res: Response) => {};

const logout = async (req: Request, res: Response) => {};

export default {
  health,
  register,
  verifyEmail,
  resendVerification,
  login,
  refresh,
  forgotPassword,
  resetPassword,
  logout,
};
