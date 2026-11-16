"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import axios from "axios";

interface Screening {
  id: string;
  movieId: string;
  date: string;
  startTime: string;
  room: string;
}

interface MovieDetail {
  id: string;
  title: string;
  duration: number;
  genre: string;
  screenings: Screening[];
}

export default function MoviePage() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);

  useEffect(() => {
    axios.get<MovieDetail>(`http://localhost:3001/movies/${id}`).then((res) => {
      setMovie(res.data);
    });
  }, [id]);

  if (!movie) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <main className="p-6">
      <Link href="/" className="underline">
        Back to Movies
      </Link>

      <h1 className="text-2xl font-bold mt-4">{movie.title}</h1>
      <p>
        {movie.duration} min - {movie.genre}
      </p>

      <h2 className="text-xl font-bold mt-6 mb-3">Screenings</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {movie.screenings.map((screening) => {
          const day = new Date(`${screening.date}T00:00:00`).toLocaleDateString(
            "en-US",
            { weekday: "long" }
          );

          return (
            <Link
              key={screening.id}
              href={`/movies/${movie.id}/${screening.id}`}
              className="border p-4 block"
            >
              <p>Day: {day}</p>
              <p>Date: {screening.date}</p>
              <p>Time: {screening.startTime}</p>
              <p>Room: {screening.room}</p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
