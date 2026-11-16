
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { validateRoutine, type RoutineErrors } from './validation';

const API_URL = 'http://localhost:4000/routines';

export interface FormState {
    errors?: RoutineErrors;
    values?: {
        name: string;
        description: string;
        level: string;
        exerciseIds: number[];
    };
}

export async function createRoutineAction(
    _prev: FormState,
    formData: FormData
): Promise<FormState> {
    const values = {
        name: String(formData.get('name') ?? ''),
        description: String(formData.get('description') ?? ''),
        level: String(formData.get('level') ?? ''),
        exerciseIds: formData.getAll('exerciseIds').map(Number),
    };

    const errors = validateRoutine(values);
    if (Object.keys(errors).length > 0) return { errors, values };

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
    });

    if (!response.ok) {
        throw new Error('No se pudo crear la rutina');
    }

    revalidatePath('/routines');
    redirect('/routines');
}

export async function toggleDoneAction(
    routineId: number,
    exerciseId: number
): Promise<void> {
    const response = await fetch(
        `${API_URL}/${routineId}/toggle/${exerciseId}`,
        { method: 'PATCH' }
    );

    if (!response.ok) {
        throw new Error('No se pudo actualizar el ejercicio');
    }

    revalidatePath(`/routines/${routineId}`);
}

export async function deleteRoutineAction(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('No se pudo eliminar la rutina');
    }

    revalidatePath('/routines');
    redirect('/routines');
}
