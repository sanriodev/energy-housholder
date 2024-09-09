/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {
  BadRequestException,
  INestApplication,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorFilter } from './common/filters/error.filter';
import { AppConfigService } from './config/config.service';

process.env.TZ = 'UTC';

async function bootstrap() {
  let app: INestApplication;
  if (process.env.node_env == 'production') {
    app = await NestFactory.create(AppModule, {
      cors: true,
    });
  } else {
    // repl for debugging!
    app = await NestFactory.create(AppModule, {
      cors: true,
    });
  }
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableVersioning();
  app.useGlobalFilters(new ErrorFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => {
        const flatMessages: { p: string; msg: string }[] = [].concat(
          errors.map((e) => ({
            p: e.property,
            msg: generateErrorMessage(e),
          })),
        );
        return new BadRequestException({
          message: 'Bad Request',
          displayMessage: flatMessages.map((fm) => `${fm.msg}`).join('<br/>'),
        });
      },
    }),
  );

  const appConfig = app.get(AppConfigService);

  app.useGlobalInterceptors(app.get(Reflector));
  bootstrapSwagger(app, appConfig);

  const port = appConfig.appPort || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

function generateErrorMessage(e): string {
  let ret = '';
  ret += e.constraints ? Object.values(e.constraints).join('<br/>') : '';
  if (e.children) {
    (e.children as any[]).forEach((child, i) => {
      if (e.constraints || i > 0) ret += '<br/>';
      ret += generateErrorMessage(child);
    });
  }
  return ret;
}

async function bootstrapSwagger(
  app: INestApplication,
  appConfig: AppConfigService,
) {
  const port = appConfig.appPort || 3000;
  const url: string = `localhost:${port}`;
  const config = new DocumentBuilder()
    .setTitle('Modbus Api')
    .setDescription('The Modbus Reader REST Api description')
    .setVersion('1.0')
    .setBasePath('api/v1')
    .addBearerAuth()
    .addServer(url, 'Default Ingress')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: true,
  });

  SwaggerModule.setup('api/v1/doc', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      urls: [url],
    },
    customSiteTitle: 'API Docs',
    explorer: true,
  } as unknown as any);
}

bootstrap();
