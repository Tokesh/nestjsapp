import { Module } from '@nestjs/common';
import { UsecaseProxyModule } from 'src/infrastructure/usecase-proxy/usecase-proxy.module';
import { UserControlController } from 'src/presentation/control/user/user.controller';

@Module({
  imports: [UsecaseProxyModule.register()],
  providers: [],
  controllers: [
    UserControlController
  ],
})
export class UserControlModule {}
