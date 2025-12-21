import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const isProduction = configService.get<string>('NODE_ENV') === 'production';
  const dbSSL = configService.get<boolean>('DB_SSL');

  // * Validación de seguridad para producción
  if (isProduction) {
    const synchronize = configService.get<string>('DB_SYNCHRONIZE');
    if (synchronize === 'true') {
      throw new Error(
        'DB_SYNCHRONIZE cannot be true in production environment',
      );
    }
  }

  return {
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
    migrations: [join(__dirname, '..', 'migrations', '*.migrations.{ts,js}')],
    synchronize:
      configService.get<string>('NODE_ENV') === 'development' &&
      configService.get<string>('DB_SYNCHRONIZE') === 'true',
    logging: configService.get<string>('NODE_ENV') !== 'production',
    ssl:
      isProduction && dbSSL
        ? {
            rejectUnauthorized: false,
          }
        : false,

    extra: {
      max: 20,
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
      maxUses: 7000,
    },
    // * Configuración de índices
    migrationsRun: true,
    migrationsTableName: 'migrations',
    retryAttempts: 3,
    retryDelay: 3000,
    autoLoadEntities: true,
    verboseRetryLog: !isProduction,
    manualInitialization: false,
    // * Configuración de caché
    cache: {
      duration: 30000, // ? 30 segundos
    },
  };
};
