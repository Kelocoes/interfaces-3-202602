import { EXERCISES } from '../data';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface ExerciseFilters {
    q?: string;
    category?: string;
}

export async function getExercises(filters: ExerciseFilters = {}) {
    await delay(800);
    const q = filters.q?.trim().toLowerCase() ?? '';
    return EXERCISES.filter(
        (e) =>
            (!q || e.name.toLowerCase().includes(q) || e.muscle.toLowerCase().includes(q)) &&
            (!filters.category || e.category === filters.category),
    );
}

export async function getExerciseById(id: number) {
    await delay(300);
    return EXERCISES.find((e) => e.id === id) ?? null;
}
