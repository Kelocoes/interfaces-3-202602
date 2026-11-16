import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { Reservation } from '../models/models';
import { CreateReservationDto } from '../models/dto';
import { MoviesService } from '../movies/movies.service';

@Injectable()
export class ReservationsService {
  private reservations: Reservation[] = [];

  constructor(private readonly moviesService: MoviesService) {}

  create(dto: CreateReservationDto): Reservation {
    const { screeningId, seatNumber } = dto;

    // Validate screening existence
    this.moviesService.findScreeningById(screeningId);

    // Validate seat number range (1-150 as per reference)
    if (seatNumber < 1 || seatNumber > 150) {
      throw new BadRequestException('Seat number must be between 1 and 150');
    }

    // Check if seat is already occupied for this screening
    const isOccupied = this.reservations.some(
      (r) => r.screeningId === screeningId && r.seatNumber === seatNumber,
    );
    if (isOccupied) {
      throw new ConflictException('Seat is already occupied for this screening');
    }

    // Generate unique alphanumeric code
    const uniqueCode = Math.random().toString(36).substring(2, 10).toUpperCase();

    const reservation: Reservation = {
      id: (this.reservations.length + 1).toString(),
      screeningId,
      seatNumber,
      uniqueCode,
    };

    this.reservations.push(reservation);
    return reservation;
  }

  findAll(): Reservation[] {
    return this.reservations;
  }
}
