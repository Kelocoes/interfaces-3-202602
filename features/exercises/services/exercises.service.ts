
import { EXERCISES } from '../data';
import type { Category, Exercise } from '../types';

// Simula la demora de una base de datos
const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

export interface ExerciseFilters {
    q?: string;
    category?: string;
    duration?: string;
}

export async function getExercises(
    filters: ExerciseFilters = {}
): Promise<Exercise[]> {
    await delay(800);

    const q = filters.q?.trim().toLowerCase();
    const duration = filters.duration;

    return EXERCISES.filter((exercise) => {
        const matchesText =
            !q ||
            exercise.name.toLowerCase().includes(q) ||
            exercise.muscle.toLowerCase().includes(q);

        const matchesCategory =
            !filters.category ||
            exercise.category === (filters.category as Category);

        const matchesDuration =
            !duration ||
            (duration === '5' && exercise.durationMin <= 5) ||
            (duration === '10' && exercise.durationMin <= 10);

        return matchesText && matchesCategory && matchesDuration;
    });
}

export async function getExerciseById(
    id: number
): Promise<Exercise | null> {
    await delay(300);

    return EXERCISES.find((exercise) => exercise.id === id) ?? null;
}
