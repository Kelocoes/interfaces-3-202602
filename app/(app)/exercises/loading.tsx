import { ExerciseGridSkeleton } from '@/features/exercises/components/ExerciseGridSkeleton';

export default function Loading() {
    return (
        <div className="space-y-6">
            <div className="skeleton h-8 w-40" />
            <ExerciseGridSkeleton />
        </div>
    );
}
