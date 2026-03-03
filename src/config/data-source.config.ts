import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

// Cargar variables de entorno
config();

const isProduction = process.env.NODE_ENV === 'production';
const dbSSL = process.env.DB_SSL;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, '..', 'migrations', '*.migration.{ts,js}')],
  synchronize: process.env.NODE_ENV === 'development' && process.env.DB_SYNCHRONIZE === 'true',
  logging: process.env.NODE_ENV !== 'production',
  ssl:
    isProduction && dbSSL === 'true'
      ? {
          rejectUnauthorized: false,
        }
      : false,
  extra: {
    max: 20,
    connectionTimeoutMillis: 5000,
  },
  migrationsTableName: 'migrations',
});
