import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="space-y-3">
            <h1 className="text-2xl font-bold">Ese ejercicio no existe</h1>
            <p>Puede que el enlace esté mal o que el ejercicio haya sido eliminado.</p>
            <Link href="/exercises" className="btn btn-primary btn-sm">Ver todos los ejercicios</Link>
        </div>
    );
}
