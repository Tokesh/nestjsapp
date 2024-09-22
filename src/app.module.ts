import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UsecaseProxyModule } from 'src/infrastructure/usecase-proxy/usecase-proxy.module';
import { EnvConfigModule } from 'src/infrastructure/config/env/env.module';
import { EnvConfigService } from 'src/infrastructure/config/env/env.service';
import { JwtServiceModule } from 'src/infrastructure/services/jwt/jwt.module';
import { ResponseInterceptor } from 'src/infrastructure/common/interceptors/response.interceptor';
import { UserControlController } from 'src/presentation/control/user/user.controller';
import { UserControlModule } from 'src/presentation/control/user/user-control.module';
import { UserController } from 'src/presentation/default/user/user.controller';
import { UserModule } from 'src/presentation/default/user/user.module';
@Module({
  imports: [
    UsecaseProxyModule.register(),
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
    /* CONTROL */
    UserControlModule,

    /* DEFAULT */
    UserModule,

  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
  controllers: [],
  exports: [],
})
export class AppModule {}
