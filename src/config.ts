import { registerAs } from '@nestjs/config';

function getEnvVar(name: string, defaultValue?: string): string {
  const value = process.env[name];
  if (value === undefined && defaultValue === undefined) {
    throw new Error(`Environment variable ${name} is required`);
  }
  return value ?? defaultValue!;
}

export const appConfig = registerAs('app', () => ({
  port: parseInt(getEnvVar('PORT', '3000'), 10),
  environment: getEnvVar('NODE_ENV', 'development'),
}));
export const databaseConfig = registerAs('database', () => ({
  // DB_USERNAME=postgres
  // DB_PASSWORD=postgres
  host: getEnvVar('DB_HOST', 'localhost'),
  port: parseInt(getEnvVar('DB_PORT', '5432'), 10),
  username: getEnvVar('DB_USERNAME', 'postgres'),
  password: getEnvVar('DB_PASSWORD', 'postgres'),
  name: getEnvVar('DB_DATABASE', 'profi_db'),
}));
