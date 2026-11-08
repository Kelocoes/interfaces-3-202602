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
        <form action={formAction} className="space-y-4">
            <div>
                <label htmlFor="routine-name" className="label">Nombre</label>
                <input
                    id="routine-name"
                    name="name"
                    className="input input-bordered w-full"
                    defaultValue={values?.name}
                    placeholder="Ej. Piernas de acero"
                    aria-invalid={!!errors?.name}
                />
                {errors?.name && <p className="label text-error">{errors.name}</p>}
            </div>

            <div>
                <label htmlFor="routine-description" className="label">Descripción (opcional)</label>
                <textarea
                    id="routine-description"
                    name="description"
                    className="textarea textarea-bordered w-full"
                    defaultValue={values?.description}
                />
            </div>

            <div>
                <label htmlFor="routine-level" className="label">Nivel</label>
                <select
                    id="routine-level"
                    name="level"
                    className="select select-bordered w-full"
                    defaultValue={values?.level ?? ''}
                    aria-invalid={!!errors?.level}
                >
                    <option value="" disabled>Elige un nivel</option>
                    {LEVELS.map((l) => (
                        <option key={l.value} value={l.value}>{l.label}</option>
                    ))}
                </select>
                {errors?.level && <p className="label text-error">{errors.level}</p>}
            </div>

            <fieldset className="space-y-2">
                <legend className="label">Ejercicios</legend>
                {exercises.map((e) => (
                    <label key={e.id} className="flex items-center gap-2 rounded-lg border border-base-300 p-2">
                        <input
                            type="checkbox"
                            name="exerciseIds"
                            value={e.id}
                            className="checkbox checkbox-primary"
                            defaultChecked={values?.exerciseIds.includes(e.id)}
                        />
                        {e.name}
                    </label>
                ))}
                {errors?.exerciseIds && <p className="label text-error">{errors.exerciseIds}</p>}
            </fieldset>

            <button type="submit" className="btn btn-primary" disabled={isPending}>
                {isPending ? 'Guardando...' : 'Guardar rutina'}
            </button>
        </form>
    );
}
