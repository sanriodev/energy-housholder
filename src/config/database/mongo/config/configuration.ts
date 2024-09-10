import { registerAs } from '@nestjs/config';

export default registerAs('mongo', () => ({
  uri: process.env.MONGO_URI,
  port: process.env.MONGO_PORT,
  username: process.env.MONGO_USERNAME,
  password: process.env.MONGO_PASSWORD,
  database: process.env.MONGO_DATABASE,
}));
