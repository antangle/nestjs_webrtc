import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { SocketIoAdapter } from './config/socketio.adapter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //cors
  app.enableCors();

  //pipe
  /*
    whitelist: ignore values that are not in entity decorator.
    transform: auto-transform types caught by controller param
  */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    })
  )

  //ejs configuration
  app.useStaticAssets(path.join(__dirname, '..', 'src', 'public'));
  app.setBaseViewsDir(path.join(__dirname, '..', 'src', 'views'));
  app.setViewEngine("ejs");
  
  //socket.io configuration 
  //app.useWebSocketAdapter(new SocketIoAdapter(app));

  await app.listen(process.env.PORT);

  console.log(`server starting on port: ${process.env.PORT}`);
}

bootstrap();