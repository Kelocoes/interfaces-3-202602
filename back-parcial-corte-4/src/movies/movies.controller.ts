import { Controller, Get, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie, Screening } from '../models/models';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    findAll(): Movie[] {
        return this.moviesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        const movie = this.moviesService.findOne(id);
        const screenings = this.moviesService.findScreeningsByMovie(id);
        return {
            ...movie,
            screenings,
        };
    }
}
