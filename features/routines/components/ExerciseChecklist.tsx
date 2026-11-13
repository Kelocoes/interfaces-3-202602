'use client';

import { useOptimistic, useTransition } from 'react';
import { toggleDoneAction } from '../actions';
import type { Exercise } from '@/features/exercises/types';

interface Props {
    routineId: number;
    exercises: Exercise[];
    doneIds: number[]; 
}

export function ExerciseChecklist({ routineId, exercises, doneIds }: Props) {
    const [, startTransition] = useTransition();

    const [optimisticDone, toggleOptimistic] = useOptimistic(doneIds, (current: number[], exerciseId: number) =>
        current.includes(exerciseId) ? current.filter((id) => id !== exerciseId) : [...current, exerciseId],
    );

    const handleToggle = (exerciseId: number) => {
        startTransition(async () => {
            toggleOptimistic(exerciseId); // 1. la pantalla cambia ya
            await toggleDoneAction(routineId, exerciseId); // 2. el servidor guarda (tarda ~0,8 s)
        });
    };

    return (
        <div className="flex flex-col gap-3">
            <progress
                className="progress progress-primary"
                value={optimisticDone.length}
                max={exercises.length}
            />
            <p className="text-sm opacity-70" aria-live="polite">
                {optimisticDone.length} de {exercises.length} ejercicios hechos
            </p>

            <ul className="flex flex-col gap-2">
                {exercises.map((exercise) => (
                    <li key={exercise.id}>
                        <label className="flex cursor-pointer items-center gap-3 rounded-box bg-base-100 p-3 shadow-sm">
                            <input
                                type="checkbox"
                                checked={optimisticDone.includes(exercise.id)}
                                onChange={() => handleToggle(exercise.id)}
                                className="checkbox checkbox-primary"
                            />
                            <span className={optimisticDone.includes(exercise.id) ? 'line-through opacity-60' : ''}>
                                {exercise.name}
                            </span>
                            <span className="ml-auto text-xs opacity-60">{exercise.durationMin} min</span>
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}