import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      user: process.env.DATABASE_USER,
      name: process.env.DATABASE_NAME,
      port: parseInt(process.env.DATABASE_PORT, 10),
      host: process.env.DATABASE_HOST,
      password: process.env.DATABASE_PASSWORD,
    },
    apiKey: process.env.API_KEY,
    typeorm: {
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
    },
  };
});
