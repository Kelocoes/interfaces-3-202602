'use client';

import { useActionState } from 'react';
import { createRoutineAction, type FormState } from '../actions';
import { LEVELS } from '../types';
import type { Exercise } from '@/features/exercises/types';

const initialState: FormState = {};

export function RoutineForm({ exercises }: { exercises: Exercise[] }) {

    const [state, formAction, isPending] = useActionState(createRoutineAction, initialState);
    const { errors, values } = state;

    return (
        <form action={formAction} className="flex flex-col gap-4">
            <div>
                <label className="label text-sm" htmlFor="routine-name">Nombre de la rutina</label>
                <input
                    id="routine-name"
                    name="name"
                    defaultValue={values?.name}
                    placeholder="Ej. Piernas de acero"
                    className="input input-bordered w-full"
                    aria-invalid={Boolean(errors?.name)}
                />
                {errors?.name && <p className="mt-1 text-sm text-error">{errors.name}</p>}
            </div>

            <div>
                <label className="label text-sm" htmlFor="routine-description">Descripción (opcional)</label>
                <textarea
                    id="routine-description"
                    name="description"
                    defaultValue={values?.description}
                    rows={3}
                    className="textarea textarea-bordered w-full"
                />
            </div>

            <div>
                <label className="label text-sm" htmlFor="routine-level">Nivel</label>
                <select
                    id="routine-level"
                    name="level"
                    defaultValue={values?.level ?? ''}
                    className="select select-bordered w-full"
                >
                    <option value="" disabled>Elige un nivel</option>
                    {LEVELS.map((level) => (
                        <option key={level.value} value={level.value}>{level.label}</option>
                    ))}
                </select>
                {errors?.level && <p className="mt-1 text-sm text-error">{errors.level}</p>}
            </div>

            <fieldset>
                <legend className="label text-sm">Ejercicios</legend>
                <div className="grid gap-2 sm:grid-cols-2">
                    {exercises.map((exercise) => (
                        <label key={exercise.id} className="flex cursor-pointer items-center gap-2 rounded-box border border-base-300 p-3">
                            <input
                                type="checkbox"
                                name="exerciseIds"
                                value={exercise.id}
                                defaultChecked={values?.exerciseIds.includes(exercise.id)}
                                className="checkbox checkbox-primary checkbox-sm"
                            />
                            <span className="text-sm">{exercise.name}</span>
                        </label>
                    ))}
                </div>
                {errors?.exerciseIds && <p className="mt-1 text-sm text-error">{errors.exerciseIds}</p>}
            </fieldset>

            <button type="submit" disabled={isPending} className="btn btn-primary w-fit">
                {isPending ? 'Guardando...' : 'Guardar rutina'}
            </button>
        </form>
    );
}