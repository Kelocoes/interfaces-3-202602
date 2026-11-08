import { Suspense } from 'react';
import { ExerciseFilters } from '@/features/exercises/components/ExerciseFilters';
import { ExerciseGrid } from '@/features/exercises/components/ExerciseGrid';
import { ExerciseGridSkeleton } from '@/features/exercises/components/ExerciseGridSkeleton';

export const metadata = { title: 'Ejercicios' };

interface PageProps {
    searchParams: Promise<{ q?: string; category?: string }>;
}

export default async function ExercisesPage({ searchParams }: PageProps) {
    const { q, category } = await searchParams;
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold">Ejercicios</h1>
                <p className="opacity-70">Explora y filtra el catálogo de ejercicios.</p>
            </header>
            <ExerciseFilters />
            {/* key: reinicia el Suspense para que el skeleton reaparezca en cada búsqueda */}
            <Suspense key={`${q ?? ''}|${category ?? ''}`} fallback={<ExerciseGridSkeleton />}>
                <ExerciseGrid q={q} category={category} />
            </Suspense>
        </div>
    );
}
