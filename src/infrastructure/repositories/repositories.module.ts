import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { EnvConfigModule } from 'src/infrastructure/config/env/env.module';
import { REPOSITORIES } from 'src/infrastructure/repositories';
import { USER_ENTITIES } from 'src/infrastructure/repositories/user';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([
      ...USER_ENTITIES,
    ]),
    
    EnvConfigModule,
  ],
  providers: [...REPOSITORIES],
  exports: [...REPOSITORIES],
})
export class RepositoriesModule {}
