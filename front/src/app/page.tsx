"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

interface Movie {
  id: string;
  title: string;
  description: string;
  duration: number;
  genre: string;
}

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    axios.get<Movie[]>("http://localhost:3001/movies").then((res) => {
      setMovies(res.data);
    });
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Movies</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            href={`/movies/${movie.id}`}
            className="border p-4 block"
          >
            <h2 className="text-lg font-bold">{movie.title}</h2>
            <p>Duration: {movie.duration} min</p>
            <p>Genre: {movie.genre}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
