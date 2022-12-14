import { AppGateway } from './gateway/socket.gateway';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MyTypeormModule } from './database/typeorm.module';
import { UsersModule } from './module/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV == 'dev' ? '.env.dev' : '.env'
    }),
    MyTypeormModule,
    UsersModule,
  ],
  providers: [AppGateway],
  controllers: [AppController],
})
export class AppModule {}