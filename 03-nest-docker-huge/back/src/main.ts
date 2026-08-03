import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { AppLogger } from './common/logger/logger.service';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        bufferLogs: true,
    });
    app.enableCors();
    app.useLogger(app.get(AppLogger));
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
