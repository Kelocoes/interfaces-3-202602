'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { routinesStore } from './store';
import { validateRoutine, type RoutineErrors } from './validation';

export interface FormState {
    errors?: RoutineErrors;
    values?: { name: string; description: string; level: string; exerciseIds: number[] };
}

export async function createRoutineAction(_prev: FormState, formData: FormData): Promise<FormState> {
    const values = {
        name: String(formData.get('name') ?? ''),
        description: String(formData.get('description') ?? ''),
        level: String(formData.get('level') ?? ''),
        exerciseIds: formData.getAll('exerciseIds').map(Number),
    };
    const errors = validateRoutine(values);
    if (Object.keys(errors).length > 0) return { errors, values };

    routinesStore.create(values);
    revalidatePath('/routines');
    redirect('/routines');
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function toggleDoneAction(routineId: number, exerciseId: number) {
    await delay(800); // lentitud simulada
    routinesStore.toggleDone(routineId, exerciseId);
    revalidatePath(`/routines/${routineId}`);
}
