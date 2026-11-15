
import Link from 'next/link';

export default function ExerciseNotFound() {
    return (
        <div className="flex flex-col items-start gap-3">
            <h1 className="text-2xl font-bold">Ese ejercicio no existe</h1>
            <p className="opacity-70">Puede que el enlace esté mal escrito o que lo hayan quitado.</p>
            <Link href="/exercises" className="btn btn-primary btn-sm">
                Ver todos los ejercicios
            </Link>
        </div>
    );
}
