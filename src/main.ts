import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('INFO', { timestamp: true });
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api');

  await app.listen(+process.env.PORT, () => {
    logger.log(`API successfully running on PORT ${process.env.PORT}`);
  });
}
bootstrap();
