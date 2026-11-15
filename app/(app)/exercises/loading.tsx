
import { ExerciseGridSkeleton } from '@/features/exercises/components/ExerciseGridSkeleton';

export default function Loading() {
    return (
        <div className="flex flex-col gap-6">
            <div className="skeleton h-8 w-40" />
            <ExerciseGridSkeleton />
        </div>
    );
}
