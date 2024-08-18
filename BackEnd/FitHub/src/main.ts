import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { LoggerMidleware } from './Middleware/logger.middleware';
import MercadoPagoConfig from 'mercadopago';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['https://fit-hub-front-end.vercel.app', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  const documentConfig = new DocumentBuilder()
    .setTitle('FitHub')
    .setDescription('Documentacion del FitHub: Tu entranador personalizado')
    .addBearerAuth()
    .setVersion('1.0.0')
    .build();

  const documentacion = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('api', app, documentacion);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(LoggerMidleware);
  await app.listen(3001);
  console.log('Server listening on http://localhost:3001');
}
bootstrap();
