import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvConfigService } from '../env/env.service';
import { EnvConfigModule } from '../env/env.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const getTypeOrmModuleOptions = (config: EnvConfigService): TypeOrmModuleOptions =>
  ({
    type: 'postgres',
    host: config.getDatabaseHost(),
    port: config.getDatabasePort(),
    username: config.getDatabaseUser(),
    password: config.getDatabasePassword(),
    database: config.getDatabaseName(),
    entities: [__dirname + './../../**/*.entity{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: false,
    schema: config.getDatabaseSchema(),
    namingStrategy: new SnakeNamingStrategy(),
    migrations: [__dirname + '/migrations**/*{.ts,.js}'],
    logging: false,
    cli: {
      migrationsDir: 'src/migrations',
    },
} as TypeOrmModuleOptions);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: 'default',
      imports: [EnvConfigModule],
      inject: [EnvConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmConfigModule {}
