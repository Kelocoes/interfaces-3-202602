import { getExercises, type ExerciseFilters } from '../services/exercises.service';
import { ExerciseCard } from './ExerciseCard';

export async function ExerciseGrid({ q, category }: ExerciseFilters) {
    const exercises = await getExercises({ q, category });

    if (exercises.length === 0) {
        return (
            <p className="rounded-box border border-dashed border-base-300 p-8 text-center opacity-70">
                No encontramos ejercicios con esos filtros.
            </p>
        );
    }

    return (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {exercises.map((exercise, index) => (
                <li key={exercise.id}>
                    <ExerciseCard exercise={exercise} priority={index < 3} />
                </li>
            ))}
        </ul>
    );
}