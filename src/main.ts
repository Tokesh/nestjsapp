import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from 'src/infrastructure/common/filter/exception.filter';
import { LoggerMiddleware } from 'src/infrastructure/common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter());
  app.use(new LoggerMiddleware().use);
  await app.listen(3000);
}
bootstrap();
