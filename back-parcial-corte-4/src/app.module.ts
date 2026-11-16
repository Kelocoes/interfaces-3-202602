import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
    imports: [MoviesModule, ReservationsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
