import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie, Screening } from '../models/models';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [
    { 
      id: '1', 
      title: 'Inception', 
      description: 'A thief who steals corporate secrets through the use of dream-sharing technology.', 
      duration: 148, 
      genre: 'Sci-Fi',
      posterUrl: 'https://image.tmdb.org/t/p/w500/9gk7Fn9sVAsS969Q9oqQ0qHS9S7.jpg'
    },
    { 
      id: '2', 
      title: 'The Godfather', 
      description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', 
      duration: 175, 
      genre: 'Crime',
      posterUrl: 'https://image.tmdb.org/t/p/w500/3bhkrj9pkSjU3zS7qB7oRq6kg9z.jpg'
    },
    { 
      id: '3', 
      title: 'Interstellar', 
      description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.', 
      duration: 169, 
      genre: 'Sci-Fi',
      posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6EwfVDxCzs25vQO2Yq9.jpg'
    },
  ];

  private screenings: Screening[] = [
    { id: 's1', movieId: '1', date: '2026-06-01', startTime: '14:00', room: 'Room A' },
    { id: 's2', movieId: '1', date: '2026-06-01', startTime: '18:00', room: 'Room B' },
    { id: 's3', movieId: '2', date: '2026-06-02', startTime: '20:00', room: 'Room A' },
    { id: 's4', movieId: '3', date: '2026-06-03', startTime: '15:00', room: 'IMAX 1' },
    { id: 's5', movieId: '3', date: '2026-06-03', startTime: '21:00', room: 'IMAX 1' },
  ];

  findAll(): Movie[] {
    return this.movies;
  }

  findOne(id: string): Movie {
    const movie = this.movies.find((m) => m.id === id);
    if (!movie) throw new NotFoundException('Movie not found');
    return movie;
  }

  findScreeningsByMovie(movieId: string): Screening[] {
    this.findOne(movieId); // check if movie exists
    return this.screenings.filter((s) => s.movieId === movieId);
  }

  findScreeningById(id: string): Screening {
    const screening = this.screenings.find((s) => s.id === id);
    if (!screening) throw new NotFoundException('Screening not found');
    return screening;
  }
}
