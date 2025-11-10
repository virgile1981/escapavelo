import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as serveStatic from 'serve-static';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  // Servir les fichiers statiques du répertoire 'uploads' sous l'URL '/static'
  app.use('/uploads',serveStatic(path.join(__dirname, '..', 'uploads')));
  app.enableCors({
      origin: process.env.URL_FRONT || 'http://localhost:4000', // ou l'URL de votre front Nuxt
      credentials: true, // ✅ Obligatoire pour autoriser les cookies
    }
  );
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));
  await app.listen(3000);
  console.log(`Application API is running on: http://localhost:3000`, process.env.NODE_ENV);
}
bootstrap();