import { Module } from '@nestjs/common';
import { JwtTokenService } from './jwt.service';
import { EnvConfigModule } from '../../config/env/env.module';
import { EnvConfigService } from '../../config/env/env.service';
import { JwtModule as Jwt } from '@nestjs/jwt';

@Module({
  imports: [
    Jwt.registerAsync({
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
  ],
  providers: [JwtTokenService],
  exports: [JwtTokenService],
})
export class JwtServiceModule {}
