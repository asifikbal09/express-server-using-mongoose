import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  mongodb_url: process.env.MONGODB_URL,
  bcryptSaltRound: process.env.BCRYPT_SALT_ROUND,
  defaultPass: process.env.DEFAULT_PASS,
};
