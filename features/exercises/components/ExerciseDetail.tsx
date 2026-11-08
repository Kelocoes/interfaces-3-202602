import Image from 'next/image';
import { CATEGORIES, type Exercise } from '../types';

export function ExerciseDetail({ exercise }: { exercise: Exercise }) {
    const label = CATEGORIES.find((c) => c.value === exercise.category)?.label;
    return (
        <article className="space-y-4">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                    src={exercise.image}
                    alt={exercise.name}
                    fill
                    priority
                    sizes="(min-width: 896px) 896px, 100vw"
                    className="object-cover"
                />
            </div>
            <h1 className="text-2xl font-bold">{exercise.name}</h1>
            <div className="flex flex-wrap items-center gap-2">
                <span className="badge badge-secondary">{label}</span>
                <span className="badge badge-outline">{exercise.muscle}</span>
                <span className="text-sm">{exercise.durationMin} minutos</span>
            </div>
            <p>{exercise.description}</p>
        </article>
    );
}
