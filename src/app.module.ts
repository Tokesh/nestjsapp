import { Module } from '@nestjs/common';
import { UsecaseProxyModule } from './infrastructure/usecase-proxy/usecase-proxy.module';
import { JwtStrategy } from './infrastructure/common/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { EnvConfigModule } from './infrastructure/config/env-config/env-config.module';
import { EnvConfigService } from './infrastructure/config/env-config/env-config.service';
import { JwtServiceModule } from './infrastructure/services/jwt/jwt.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './infrastructure/common/interceptors/response.interceptor';
@Module({
  imports: [
    UsecaseProxyModule.register(),
    PassportModule,
    EnvConfigModule,
    JwtModule.registerAsync({
      imports: [EnvConfigModule],
      inject: [EnvConfigService],
      useFactory: async (config: EnvConfigService) => {
        return {
          secret: config.getJwtSecret(),
          signOptions: {
            expiresIn: `${config.getJwtExpirationTime()}s`,
          },
        };
      },
    }),
    
    JwtServiceModule,

  ],
  providers: [
    JwtStrategy,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
  controllers: [],
  exports: [],
})
export class AppModule {}
