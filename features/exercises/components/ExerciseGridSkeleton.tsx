export function ExerciseGridSkeleton() {
    return (
        <ul aria-label="Cargando ejercicios" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
                <li key={i} className="card bg-base-100 border border-base-300">
                    <div className="skeleton aspect-[4/3] w-full rounded-b-none" />
                    <div className="card-body p-4 gap-2">
                        <div className="skeleton h-4 w-2/3" />
                        <div className="skeleton h-3 w-1/3" />
                    </div>
                </li>
            ))}
        </ul>
    );
}
