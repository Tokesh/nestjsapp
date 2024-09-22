import { DynamicModule, Module } from '@nestjs/common';
import { EnvConfigModule } from 'src/infrastructure/config/env/env.module';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { BcryptModule } from 'src/infrastructure/services/bcrypt/bcrypt.module';
import { JwtServiceModule } from 'src/infrastructure/services/jwt/jwt.module';
import { userProxyExports, userProxyProviders } from 'src/infrastructure/usecase-proxy/user/user.proxy';

@Module({
  imports: [
    EnvConfigModule,
    RepositoriesModule,
    BcryptModule,
    JwtServiceModule,
  ],
})
export class UsecaseProxyModule {
  static register(): DynamicModule {
    return {
      module: UsecaseProxyModule,
      providers: [
        ...userProxyProviders,
      ],
      exports: [
        ...userProxyExports,
      ],
    };
  }
}
