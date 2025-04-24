import dotenv from 'dotenv';
import { validateEnv } from '../../shared/utils/index';
import { formatUrl } from '../../shared/utils/url-formatter';
import { parseTime } from '../../shared/utils/time.utils';

dotenv.config();

const requiredEnvVars = [
  'MONGO_URI',
  'CONVENTION_API',
  'JWT_SECRET',
  'JWT_SECRET_REFRESH',
];
validateEnv(requiredEnvVars);

const lambdaUrl =
  'https://sreiiipsy6eog7adotnk4tbbxm0mkuxi.lambda-url.us-east-2.on.aws/';

const config = {
  database: {
    mongoUri: process.env.MONGO_URI as string,
  },
  lambda: {
    lambdaUrl: formatUrl(lambdaUrl, process.env.ENV ?? 'dev'),
  },
  server: {
    port: parseInt(process.env.PORT ?? ('3000' as string), 10),
  },
  jwt: {
    secret: process.env.JWT_SECRET as string,
    secretRefresh: process.env.JWT_SECRET_REFRESH as string,
    // Transform them to seconds
    tokenExpiresIn: parseTime(process.env.JWT_EXPIRES_IN ?? '30m'),
    refreshExpiresTokenIn: parseTime(
      process.env.JWT_REFRESH_EXPIRES_IN ?? '7d',
    ),
    saltRounds: parseInt(process.env.JWT_SALT_ROUNDS ?? '10', 10),
  },
  logging: {
    level: process.env.LOG_LEVEL ?? 'info',
  },
  api: {
    conventionApi: process.env.CONVENTION_API as string,
  },
  env: {
    nodeEnv: process.env.NODE_ENV ?? 'development',
  },
};

export default config;
