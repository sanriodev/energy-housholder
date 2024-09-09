import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const appConfig: AppConfigService = app.get(AppConfigService);

  app.setGlobalPrefix('api/v1');
  app.useGlobalInterceptors(app.get(Reflector));
  bootstrapSwagger(app, appConfig);

  await app.startAllMicroservices();
  await app.listen(appConfig.appPort);
}

async function bootstrapSwagger(
  app: INestApplication<any>,
  appConfig: AppConfigService,
) {
  const config = new DocumentBuilder()
    .setTitle('Modbus Api')
    .setDescription('The Modbus Reader REST Api description')
    .setVersion('1.0')
    .setBasePath('api/v1')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: false,
  });
}
bootstrap();
