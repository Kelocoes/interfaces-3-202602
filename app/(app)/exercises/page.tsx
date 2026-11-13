import { ExerciseGrid } from '@/features/exercises/components/ExerciseGrid';

export const metadata = { title: 'Ejercicios' };

export default function ExercisesPage() {
    return (
        <div className="flex flex-col gap-6">
            <header>
                <h1 className="text-2xl font-bold">Ejercicios</h1>
                <p className="text-sm opacity-70">Elige un ejercicio para ver cómo se hace.</p>
            </header>

            <ExerciseGrid />
        </div>
    );
}