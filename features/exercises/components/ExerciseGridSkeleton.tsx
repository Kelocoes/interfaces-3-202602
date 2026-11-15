
export function ExerciseGridSkeleton() {
    return (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Cargando ejercicios">
            {Array.from({ length: 6 }).map((_, i) => (
                <li key={i} className="card bg-base-100 shadow-sm">
                    <div className="skeleton aspect-[4/3] w-full rounded-b-none" />
                    <div className="card-body gap-2 p-4">
                        <div className="skeleton h-4 w-2/3" />
                        <div className="skeleton h-3 w-1/3" />
                    </div>
                </li>
            ))}
        </ul>
    );
}
