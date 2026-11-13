import { Suspense } from 'react';
import { ExerciseFilters } from '@/features/exercises/components/ExerciseFilters';
import { ExerciseGrid } from '@/features/exercises/components/ExerciseGrid';
import { ExerciseGridSkeleton } from '@/features/exercises/components/ExerciseGridSkeleton';

interface PageProps {
    searchParams: Promise<{ q?: string; category?: string }>;
}

export const metadata = { title: 'Ejercicios' };

export default async function ExercisesPage({ searchParams }: PageProps) {
    const { q, category } = await searchParams;

    return (
        <div className="flex flex-col gap-6">
            <header>
                <h1 className="text-2xl font-bold">Ejercicios</h1>
                <p className="text-sm opacity-70">Elige un ejercicio para ver cómo se hace.</p>
            </header>

            <ExerciseFilters />

            {/* La key reinicia el Suspense en cada búsqueda y vuelve a mostrar el esqueleto */}
            <Suspense key={`${q ?? ''}|${category ?? ''}`} fallback={<ExerciseGridSkeleton />}>
                <ExerciseGrid q={q} category={category} />
            </Suspense>
        </div>
    );
}