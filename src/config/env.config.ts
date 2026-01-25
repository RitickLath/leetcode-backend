import dotenv from "dotenv";
dotenv.config();

interface EnvironmentConfig {
  NODE_ENV: "development" | "production" | "test";
  PORT: number;
  MONGO_URI: string;
  CORS_ORIGIN: string;
}

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key] ?? defaultValue;

  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

export const env: EnvironmentConfig = {
  NODE_ENV: getEnvVar(
    "NODE_ENV",
    "development",
  ) as EnvironmentConfig["NODE_ENV"],
  PORT: parseInt(getEnvVar("PORT", "3000"), 10),
  MONGO_URI: getEnvVar("MONGO_URI", ""),
  CORS_ORIGIN: getEnvVar("CORS_ORIGIN", "*"),
};

export default env;
