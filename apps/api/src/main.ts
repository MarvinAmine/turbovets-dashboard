import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Force-load the root .env file
dotenv.config({ path: path.join(process.cwd(), '.env') });

async function bootstrap() {
  console.log('Loaded DATABASE_URL:', process.env['DATABASE_URL']);
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'http://localhost:8080',
    ],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    optionsSuccessStatus: 200,
  });
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidUnknownValues: true,
    }),
  );
  const port = process.env['PORT'] ? Number(process.env['PORT']) : 3000;
  await app.listen(port, '0.0.0.0');
  // eslint-disable-next-line no-console
  console.log(`API listening on http://0.0.0.0:${port}`);
}
bootstrap();
