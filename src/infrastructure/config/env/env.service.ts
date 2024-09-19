import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from 'src/domain/config/database.interface';
import { JWTConfig } from '../../../domain/config/jwt.interface';

@Injectable()
export class EnvConfigService implements DatabaseConfig, JWTConfig {
  constructor(private configService: ConfigService) {}

  /* JWT */
  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET') || '';
  }

  getJwtExpirationTime(): string {
    return this.configService.get<string>('JWT_EXPIRATION_TIME') || '';
  }

  getJwtRefreshSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET') || '';
  }

  getJwtRefreshExpirationTime(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME') || '';
  }

  /* DATABASE */
  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST') || 'localhost';
  }

  getDatabasePort(): number {
    return this.configService.get<number>('DATABASE_PORT') || 5432;
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('DATABASE_USER') || 'postgres';
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD') || '';
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME') || 'demetra';
  }

  getDatabaseSchema(): string {
    return this.configService.get<string>('DATABASE_SCHEMA') || 'public';
  }

  getDatabaseSync(): boolean {
    const value = this.configService.get<string>('DATABASE_SYNCHRONIZE') || null;
    const result = value === 'enabled';
    return result;
  }

}
