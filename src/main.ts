import { SocketIoAdapter } from './config/socketio.adapter';
import { WinstonLogger, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { GlobalExceptionFilter } from './filter/global.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getServer } from './config/https.config';
import express from 'express';
import * as path from 'path';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //cors
  app.enableCors();

  //ejs configuration
  app.useStaticAssets(path.join(__dirname, '..', 'src', 'public'));
  app.setBaseViewsDir(path.join(__dirname, '..', 'src', 'views'));
  app.setViewEngine("ejs");
  
  //socket.io configuration 
  app.useWebSocketAdapter(new SocketIoAdapter(app));

  await app.listen(process.env.PORT);

  console.log(`server starting on port: ${process.env.PORT}`);
}

bootstrap();