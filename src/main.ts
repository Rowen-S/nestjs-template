import {
  BadRequestException,
  Logger,
  LogLevel,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';

import { AppModule } from './app.module';
import { CustomLogger } from './common/logger.service';

declare const module: any;
async function bootstrap() {
  const server = express();

  const levels = process.env.LOG_LEVELS?.split(',').map(
    (s) => s.trim() as LogLevel,
  );

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
    bufferLogs: true,
  });

  app.useLogger(new CustomLogger('Main', levels));

  if (process.env.NODE_ENV === 'production') {
    app.enableShutdownHooks();
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );

  app.enableCors();

  server.set('trust proxy', true);

  const config = new DocumentBuilder()
    .setTitle('nestjs template')
    .setDescription('The API description.')
    .setVersion('1.0')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'api-key',
        in: 'header',
      },
      'api-key',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = parseInt(process.env.PORT, 10);

  await app.listen(port || 3004);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  Logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
