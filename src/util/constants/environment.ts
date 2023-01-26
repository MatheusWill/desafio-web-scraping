import "dotenv/config";

export const LOGGER = {
  CONSOLE: { LEVEL: process.env.LOGGER_CONSOLE_LEVEL || "info" },
};

export const SERVER = {
  PORT: process.env.PORT || 3030,
  NODE_ENV: process.env.NODE_ENV || "development",
  BASE_URI: process.env.BASE_URI || "/api/v1",
};

export const APM = {
  ENABLED: process.env.ENABLE_APM || false,
  SECRET_TOKEN: process.env.APM_SECRET_TOKEN || "",
  SERVER_URL: process.env.APM_SERVER_URL || "",
  ENVIRONMENT: process.env.APM_ENVIRONMENT || "",
};
