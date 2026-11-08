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
    const [optimisticDone, toggleOptimistic] = useOptimistic(doneIds, (state, id: number) =>
        state.includes(id) ? state.filter((x) => x !== id) : [...state, id],
    );
    const [, startTransition] = useTransition();

    const handleToggle = (exerciseId: number) =>
        startTransition(async () => {
            toggleOptimistic(exerciseId);
            await toggleDoneAction(routineId, exerciseId);
        });

    const done = optimisticDone.length;

    return (
        <div className="space-y-4">
            <progress className="progress progress-primary w-full" value={done} max={exercises.length} />
            <p aria-live="polite">{done} de {exercises.length} ejercicios hechos</p>
            <ul className="space-y-2">
                {exercises.map((e) => {
                    const isDone = optimisticDone.includes(e.id);
                    return (
                        <li key={e.id}>
                            <label className="flex items-center gap-3 rounded-lg border border-base-300 bg-base-100 p-3">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-primary"
                                    checked={isDone}
                                    onChange={() => handleToggle(e.id)}
                                />
                                <span className={`grow ${isDone ? 'line-through opacity-60' : ''}`}>{e.name}</span>
                                <span className="text-sm opacity-70">{e.durationMin} min</span>
                            </label>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
