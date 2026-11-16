import { Controller, Post, Body, Get } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from '../models/dto';
import { Reservation } from '../models/models';

@Controller('reservations')
export class ReservationsController {
    constructor(private readonly reservationsService: ReservationsService) {}

    @Post()
    create(@Body() dto: CreateReservationDto): Reservation {
        return this.reservationsService.create(dto);
    }

    @Get()
    findAll(): Reservation[] {
        return this.reservationsService.findAll();
    }
}
