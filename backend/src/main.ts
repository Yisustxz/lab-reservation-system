import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const port = process.env.PORT;
  if (!port) {
    throw new Error('PORT environment variable is not defined');
  }

  console.log(`Backend starting on port ${port}`);

  await app.listen(parseInt(port));
  console.log(`Backend is running on port ${port}`);
}

bootstrap();
