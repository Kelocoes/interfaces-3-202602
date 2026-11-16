
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // Remueve propiedades que no estén en el DTO
            forbidNonWhitelisted: true, // Lanza error si se envían propiedades no reconocidas
            transform: true, // Transforma automáticamente los payloads a instancias de sus DTOs
        }),
    );

    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true,
    });

    const port = Number(process.env.PORT ?? 4000);
    await app.listen(port);
}

bootstrap().catch((error) => {
    console.error('Error al iniciar la aplicación:', error);
    process.exit(1);
});
