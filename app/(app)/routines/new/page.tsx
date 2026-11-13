import Link from 'next/link';
import { EXERCISES } from '@/features/exercises/data';
import { RoutineForm } from '@/features/routines/components/RoutineForm';

export const metadata = { title: 'Nueva rutina' };

export default function NewRoutinePage() {
    return (
        <div className="flex flex-col gap-4">
            <Link href="/routines" className="btn btn-ghost btn-sm w-fit">← Volver a rutinas</Link>
            <h1 className="text-2xl font-bold">Nueva rutina</h1>
            <RoutineForm exercises={EXERCISES} />
        </div>
    );
}