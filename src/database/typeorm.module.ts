import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({path: path.join(__dirname,'../../.env')});

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "postgres",
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            synchronize: true,
            logging: true,   
            migrationsRun: false,
            entities: [
                path.join(__dirname, './../entities/*.entity.{ts,js}')
            ],
            migrations: [
                path.join(__dirname, './../migrations/*.{ts,js}')
            ],
            subscribers: [
                path.join(__dirname, './../subscribers/*.{ts,js}')
            ],
        })
    ]
})

export class MyTypeormModule{}