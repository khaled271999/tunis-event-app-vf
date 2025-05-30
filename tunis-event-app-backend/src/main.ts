import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 👉 IMPORT SWAGGER
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // 👉 CORS + VALIDATION
  app.enableCors({
    origin: '*', // ⚠️ à restreindre en prod si nécessaire
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // 👉 SWAGGER CONFIGURATION
  const config = new DocumentBuilder()
    .setTitle('Tunis Events API')
    .setDescription('API publique pour les événements de Tunis.')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger UI => http://localhost:3000/api

  await app.listen(3000, '0.0.0.0', () => console.log('API OK'));
}
bootstrap();
