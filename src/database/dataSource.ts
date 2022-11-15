import { DataSource } from 'typeorm';

import 'dotenv/config';

console.log('test: ', process.env.TYPEORM_USERNAME);

export const connectionSource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT),
  database: process.env.TYPEORM_DATABASE,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  synchronize: false,
  logging: true,
  entities: ['src/**/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
});

//para generar una migration "init" => nombre de la migration
//npm run migration:generate -- src/database/migrations/init
