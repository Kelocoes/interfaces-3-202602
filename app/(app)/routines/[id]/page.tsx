
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EXERCISES } from '@/features/exercises/data';
import { ExerciseChecklist } from '@/features/routines/components/ExerciseChecklist';
import type { Routine } from '@/features/routines/types';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function RoutineDetailPage({ params }: PageProps) {
    const { id } = await params;

    const response = await fetch(`http://localhost:4000/routines/${id}`, {
        cache: 'no-store',
    });

    if (response.status === 404) notFound();

    if (!response.ok) {
        throw new Error('No se pudo cargar la rutina');
    }

    const routine: Routine = await response.json();

    const exercises = routine.exerciseIds
        .map((exerciseId) => EXERCISES.find((exercise) => exercise.id === exerciseId))
        .filter((exercise) => exercise !== undefined);

    return (
        <div className="flex flex-col gap-4">
            <Link href="/routines" className="btn btn-ghost btn-sm w-fit">
                ← Volver a rutinas
            </Link>
            <div>
                <h1 className="text-2xl font-bold">{routine.name}</h1>
                <p className="text-sm opacity-70">{routine.description}</p>
            </div>
            <ExerciseChecklist
                routineId={routine.id}
                exercises={exercises}
                doneIds={routine.doneIds}
            />
        </div>
    );
}

