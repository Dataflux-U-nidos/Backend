import dotenv from "dotenv";
import { validateEnv } from "../../shared/utils/index";

dotenv.config();

const requiredEnvVars = ["MONGO_URI"];
validateEnv(requiredEnvVars);

const config = {
  database: {
    mongoUri: process.env.MONGO_URI as string,
  },
  server: {
    port: parseInt(process.env.PORT as string, 10),
  },
  jwt: {
    secret: process.env.JWT_SECRET as string,
    expiresIn: process.env.JWT_EXPIRES_IN ?? "1h",
  },
  logging: {
    level: process.env.LOG_LEVEL ?? "info",
  },
};

export default config;
