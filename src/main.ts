import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ServerConfigProps } from './interfaces/config.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const documentConfig = new DocumentBuilder()
    .setTitle('Organization Management System')
    .setDescription(
      'This is the documentation for a simple Organizational Structure Management System',
    )
    .addBearerAuth(
      {
        description:
          'Please enter your authorization token in the format: Bearer <token>',
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'authorization',
    )
    .setVersion('1.0')
    .addTag('OMS')
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  const configService = app.get<ConfigService>(ConfigService);
  const { port } = configService.get<ServerConfigProps>('server');
  await app.listen(port);
}
bootstrap();
