
import Link from 'next/link';
import { LEVELS, type Routine } from '@/features/routines/types';
import { deleteRoutineAction } from '@/features/routines/actions';

export const metadata = { title: 'Rutinas' };

async function getRoutines(): Promise<Routine[]> {
    const response = await fetch('http://localhost:4000/routines', {
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error('No se pudieron cargar las rutinas');
    }

    return response.json();
}

export default async function RoutinesPage() {
    const routines = await getRoutines();

    return (
        <div className="flex flex-col gap-6">
            <header className="flex items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Rutinas</h1>
                    <p className="text-sm opacity-70">
                        Combina ejercicios y marca lo que ya hiciste.
                    </p>
                </div>
                <Link href="/routines/new" className="btn btn-primary btn-sm">
                    Nueva rutina
                </Link>
            </header>

            <ul className="grid gap-4 sm:grid-cols-2">
                {routines.map((routine) => (
                    <li key={routine.id} className="card bg-base-100 shadow-sm">
                        <Link
                            href={`/routines/${routine.id}`}
                            className="transition-shadow hover:shadow-md"
                        >
                            <div className="card-body gap-2 p-4">
                                <h2 className="card-title text-base">
                                    {routine.name}
                                </h2>
                                <p className="text-sm opacity-70">
                                    {routine.description}
                                </p>
                                <div className="flex items-center gap-2">
                                    <span className="badge badge-secondary badge-sm">
                                        {LEVELS.find(
                                            (level) => level.value === routine.level
                                        )?.label}
                                    </span>
                                    <span className="text-xs opacity-70">
                                        {routine.exerciseIds.length} ejercicios
                                    </span>
                                </div>
                            </div>
                        </Link>

                        <div className="card-body pt-0">
                            <form action={deleteRoutineAction.bind(null, routine.id)}>
                                <button type="submit" className="btn btn-error btn-sm">
                                    Eliminar rutina
                                </button>
                            </form>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
