export class Movie {
    id: string;
    title: string;
    description: string;
    duration: number; // in minutes
    genre: string;
    posterUrl: string;
}

export class Screening {
    id: string;
    movieId: string;
    date: string; // e.g., "2026-06-01"
    startTime: string; // e.g., "18:00"
    room: string;
}

export class Reservation {
    id: string;
    screeningId: string;
    seatNumber: number;
    uniqueCode: string;
}
