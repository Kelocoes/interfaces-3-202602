import Link from 'next/link';
import { routinesStore } from '@/features/routines/store';
import { LEVELS } from '@/features/routines/types';

export const metadata = { title: 'Rutinas' };

export default function RoutinesPage() {
    const routines = routinesStore.list();
    return (
        <div className="space-y-6">
            <header className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Rutinas</h1>
                    <p className="opacity-70">Combina ejercicios y marca lo que ya hiciste.</p>
                </div>
                <Link href="/routines/new" className="btn btn-primary btn-sm">Nueva rutina</Link>
            </header>
            <ul className="grid gap-4 sm:grid-cols-2">
                {routines.map((r) => (
                    <li key={r.id}>
                        <Link href={`/routines/${r.id}`} className="card bg-base-100 border border-base-300 hover:shadow-md transition-shadow">
                            <div className="card-body p-4">
                                <h2 className="card-title text-base">{r.name}</h2>
                                <p className="text-sm opacity-70">{r.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="badge badge-secondary badge-sm">
                                        {LEVELS.find((l) => l.value === r.level)?.label}
                                    </span>
                                    <span className="text-sm">{r.exerciseIds.length} ejercicios</span>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
