import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { MoviesModule } from '../movies/movies.module';

@Module({
    imports: [MoviesModule],
    providers: [ReservationsService],
    controllers: [ReservationsController],
})
export class ReservationsModule {}
