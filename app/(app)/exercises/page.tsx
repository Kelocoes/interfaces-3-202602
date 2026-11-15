import { Suspense } from 'react';
import { ExerciseFilters } from '@/features/exercises/components/ExerciseFilters';
import { ExerciseGrid } from '@/features/exercises/components/ExerciseGrid';
import { ExerciseGridSkeleton } from '@/features/exercises/components/ExerciseGridSkeleton';

interface PageProps {
    searchParams: Promise<{
        q?: string;
        category?: string;
        duration?: string;
    }>;
}

export const metadata = { title: 'Ejercicios' };

export default async function ExercisesPage({ searchParams }: PageProps) {
    const { q, category, duration } = await searchParams;

    return (
        <div className="flex flex-col gap-6">
            <header>
                <h1 className="text-2xl font-bold">Ejercicios</h1>
                <p className="text-sm opacity-70">
                    Elige un ejercicio para ver cómo se hace.
                </p>
            </header>

            <ExerciseFilters />

            <Suspense
                key={`${q ?? ''}|${category ?? ''}|${duration ?? ''}`}
                fallback={<ExerciseGridSkeleton />}
            >
                <ExerciseGrid
                    q={q}
                    category={category}
                    duration={duration}
                />
            </Suspense>
        </div>
    );
}
