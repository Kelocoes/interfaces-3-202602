import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EXERCISES } from '@/features/exercises/data';
import { ExerciseChecklist } from '@/features/routines/components/ExerciseChecklist';
import { routinesStore } from '@/features/routines/store';

export default async function RoutinePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const routine = routinesStore.get(Number(id));
    if (!routine) notFound();

    const exercises = routine.exerciseIds
        .map((eid) => EXERCISES.find((e) => e.id === eid))
        .filter((e) => e !== undefined);

    return (
        <div className="space-y-4">
            <Link href="/routines" className="link">← Volver a rutinas</Link>
            <h1 className="text-2xl font-bold">{routine.name}</h1>
            <p>{routine.description}</p>
            <ExerciseChecklist routineId={routine.id} exercises={exercises} doneIds={routine.doneIds} />
        </div>
    );
}
