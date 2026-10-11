import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ExercisesModule } from './exercises/exercises.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }), // Load .env file and make it available globally
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) =>
                ({
                    type: configService.get<string>('DB_TYPE') ?? 'postgres',
                    host: configService.get<string>('DB_HOST') ?? 'localhost',
                    port: configService.get<number>('POSTGRES_PORT') ?? 5432,
                    username: configService.get<string>('POSTGRES_USER') ?? 'postgres',
                    password: configService.get<string>('POSTGRES_PASSWORD') ?? 'postgres',
                    database: configService.get<string>('POSTGRES_DB') ?? 'mydatabase',
                    entities: [__dirname + '/**/*.entity{.ts,.js}'],
                    synchronize: configService.get<boolean>('DB_SYNCHRONIZE') ?? true,
                }) as TypeOrmModuleOptions,
        }),
        AuthModule,
        ExercisesModule,
    ],

    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
