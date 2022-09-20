import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { MyTypeormModule } from './database/typeorm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV == 'dev' ? '.env.dev' : '.env'
    }),
    MyTypeormModule,
  ],
  controllers: [],
}) 
export class AppModule {}