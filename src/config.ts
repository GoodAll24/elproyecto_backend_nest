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
  host: getEnvVar('MYSQL_HOST', 'localhost'),
  port: parseInt(getEnvVar('MYSQL_PORT', '3306'), 10),
  username: getEnvVar('MYSQL_USERNAME', 'root'),
  password: getEnvVar('MYSQL_PASSWORD', 'root'),
  name: getEnvVar('MYSQL_NAME', 'profi_db'),
}));
