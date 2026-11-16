"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import axios from "axios";

interface Reservation {
  id: string;
  screeningId: string;
  seatNumber: number;
}

const seats = Array.from({ length: 150 }, (_, index) => index + 1);

export default function ScreeningSeatsPage() {
  const { id, screeningId } = useParams<{ id: string; screeningId: string }>();
  const [reservedSeats, setReservedSeats] = useState<number[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  useEffect(() => {
    axios
      .get<Reservation[]>("http://localhost:3001/reservations")
      .then((res) => {
        const occupied = res.data
          .filter((r) => r.screeningId === screeningId)
          .map((r) => r.seatNumber);
        setReservedSeats(occupied);
      });
  }, [screeningId]);

  function toggleSeat(seatNumber: number) {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  }

  async function handleReserve() {
    for (const seatNumber of selectedSeats) {
      await axios.post("http://localhost:3001/reservations", {
        screeningId,
        seatNumber,
      });
    }

    setReservedSeats([...reservedSeats, ...selectedSeats]);
    setSelectedSeats([]);
  }

  return (
    <main className="p-6">
      <Link href={`/movies/${id}`} className="underline">
        Back to Screenings
      </Link>

      <h1 className="text-2xl font-bold mt-4 mb-2">Select Seats</h1>

      <div className="flex gap-4 mb-4 text-sm">
        <span className="px-2 py-1 bg-gray-200">Available</span>
        <span className="px-2 py-1 bg-green-500 text-white">Selected</span>
        <span className="px-2 py-1 bg-red-500 text-white">Reserved</span>
      </div>

      <div className="grid grid-cols-15 gap-1">
        {seats.map((seat) => {
          const isReserved = reservedSeats.includes(seat);
          const isSelected = selectedSeats.includes(seat);

          return (
            <button
              key={seat}
              disabled={isReserved}
              onClick={() => toggleSeat(seat)}
              className={`p-2 border text-sm ${
                isReserved
                  ? "bg-red-500 text-white"
                  : isSelected
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {seat}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleReserve}
        disabled={selectedSeats.length === 0}
        className="mt-4 px-4 py-2 border bg-blue-500 text-white disabled:bg-gray-300"
      >
        Reserve Seats
      </button>
    </main>
  );
}
