import { Module } from '@nestjs/common';
import { UsecaseProxyModule } from 'src/infrastructure/usecase-proxy/usecase-proxy.module';
import { UserController } from 'src/presentation/default/user/user.controller';

@Module({
  imports: [UsecaseProxyModule.register()],
  providers: [],
  controllers: [
    UserController
  ],
})
export class UserModule {}
