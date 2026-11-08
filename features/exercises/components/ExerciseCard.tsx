import Image from 'next/image';
import Link from 'next/link';
import { CATEGORIES, type Exercise } from '../types';

export function ExerciseCard({ exercise, priority = false }: { exercise: Exercise; priority?: boolean }) {
    const label = CATEGORIES.find((c) => c.value === exercise.category)?.label;
    return (
        <Link
            href={`/exercises/${exercise.id}`}
            className="card bg-base-100 border border-base-300 hover:shadow-md transition-shadow"
        >
            <figure className="relative aspect-[4/3]">
                <Image
                    src={exercise.image}
                    alt={exercise.name}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover"
                    priority={priority}
                />
            </figure>
            <div className="card-body p-4">
                <h2 className="card-title text-base">{exercise.name}</h2>
                <p className="text-sm opacity-70">{exercise.muscle}</p>
                <div className="flex items-center justify-between">
                    <span className="badge badge-secondary badge-sm">{label}</span>
                    <span className="text-sm">{exercise.durationMin} min</span>
                </div>
            </div>
        </Link>
    );
}
