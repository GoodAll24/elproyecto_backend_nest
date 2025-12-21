import { plainToClass } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsString,
  validateSync,
  IsBoolean,
  IsOptional,
  MinLength,
  IsIn,
  ValidateIf,
} from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;

  // hashing rounds for bcrypt
  @IsNumber()
  BCRYPT_SALT_ROUNDS: number;

  // Database configuration
  @IsString()
  DB_HOST: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  @MinLength(8, {
    message: 'Database password must be at least 8 characters long',
  })
  DB_PASSWORD: string;

  @IsString()
  DB_DATABASE: string;

  @IsBoolean()
  @IsOptional()
  DB_SYNCHRONIZE?: boolean;

  @IsBoolean()
  @IsOptional()
  DB_SSL?: boolean;

  // Security validation for production
  @ValidateIf(
    (o: EnvironmentVariables) => o.NODE_ENV === Environment.Production,
  )
  @IsBoolean()
  @IsIn([false], { message: 'DB_SYNCHRONIZE must be false in production' })
  DB_SYNCHRONIZE_PROD?: boolean;

  // * auth variables
  // @IsString()
  // @MinLength(32, { message: 'JWT_SECRET must be at least 32 characters long' })
  // JWT_SECRET: string;

  // @IsNumber()
  // @IsIn([300, 600, 900, 1800, 3600], {
  //   message: 'JWT_EXPIRATION must be a standard duration in seconds',
  // })
  // JWT_EXPIRATION: number;

  // @IsString()
  // @IsOptional()
  // @MinLength(32, { message: 'JWT_REFRESH_SECRET must be at least 32 characters long' })
  // JWT_REFRESH_SECRET?: string;

  // @IsNumber()
  // @IsOptional()
  // @IsIn([86400, 604800, 2592000], {
  //   message: 'JWT_REFRESH_EXPIRATION must be a standard duration in seconds',
  // })
  // JWT_REFRESH_EXPIRATION?: number;

  // @IsString()
  // @MinLength(32, { message: 'ENCRYPTION_KEY must be at least 32 characters long' })
  // ENCRYPTION_KEY: string;

  // // * Email configuration
  // @IsString()
  // SMTP_HOST: string;

  // @IsNumber()
  // @IsIn([25, 465, 587], { message: 'SMTP_PORT must be a standard SMTP port' })
  // SMTP_PORT: number;

  // @IsString()
  // SMTP_USER: string;

  // @IsString()
  // @MinLength(8, { message: 'SMTP_PASSWORD must be at least 8 characters long' })
  // SMTP_PASSWORD: string;

  // @IsString()
  // @IsOptional()
  // SMTP_FROM?: string;

  // // * SMS configuration
  // @IsString()
  // @IsOptional()
  // ZD_SMS_EMAIL?: string;

  // @IsString()
  // @IsOptional()
  // ZD_SMS_PASSWORD?: string;

  // // * Security headers
  // @IsString()
  // @IsOptional()
  // CORS_ORIGIN?: string;

  // @IsNumber()
  // @IsOptional()
  // RATE_LIMIT_TTL?: number;

  // @IsNumber()
  // @IsOptional()
  // RATE_LIMIT_MAX?: number;

  // // * Monitoring and logging
  // @IsString()
  // @IsOptional()
  // SENTRY_DSN?: string;

  // @IsBoolean()
  // @IsOptional()
  // ENABLE_SWAGGER?: boolean;

  // // * Additional security
  // @IsString()
  // @IsOptional()
  // SESSION_SECRET?: string;

  // @IsString()
  // @IsOptional()
  // APP_URL?: string;

  // @IsString()
  // @IsOptional()
  // GOOGLE_MAPS_API_KEY?: string;

  // // * Redis configuration
  // @IsString()
  // @IsOptional()
  // REDIS_HOST?: string;

  // @IsNumber()
  // @IsOptional()
  // REDIS_PORT?: number;

  // @IsString()
  // @IsOptional()
  // REDIS_PASSWORD?: string;

  // // * AWS configuration
  // @IsString()
  // @IsOptional()
  // AWS_ACCESS_KEY_ID?: string;

  // @IsString()
  // @IsOptional()
  // AWS_SECRET_ACCESS_KEY?: string;

  // @IsString()
  // @IsOptional()
  // AWS_REGION?: string;

  // @IsString()
  // @IsOptional()
  // AWS_S3_BUCKET?: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length) {
    const errorMessages = errors
      .map(
        (error) =>
          `${error.property}: ${Object.values(error.constraints || {}).join(', ')}`,
      )
      .join('\n');

    throw new Error(`Environment validation failed:\n${errorMessages}`);
  }

  // // * Additional security checks for production
  // if (validatedConfig.NODE_ENV === Environment.Production) {
  //   if (validatedConfig.DB_SYNCHRONIZE === true) {
  //     throw new Error(
  //       'DB_SYNCHRONIZE cannot be true in production environment',
  //     );
  //   }

  //   if (validatedConfig.ENABLE_SWAGGER === true) {
  //     throw new Error(
  //       'ENABLE_SWAGGER should be false in production environment',
  //     );
  //   }

  //   if (validatedConfig.CORS_ORIGIN === '*') {
  //     throw new Error('CORS_ORIGIN cannot be "*" in production environment');
  //   }
  // }

  return validatedConfig;
}
