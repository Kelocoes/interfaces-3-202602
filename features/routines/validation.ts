import { EXERCISES } from '@/features/exercises/data';
import { LEVELS, type RoutineInput } from './types';

export type RoutineErrors = Partial<Record<'name' | 'level' | 'exerciseIds', string>>;

export function validateRoutine(input: RoutineInput): RoutineErrors {
    const errors: RoutineErrors = {};
    if (input.name.trim().length < 3) errors.name = 'El nombre debe tener al menos 3 caracteres.';
    if (!LEVELS.some((l) => l.value === input.level)) errors.level = 'Elige un nivel.';
    if (input.exerciseIds.length === 0) errors.exerciseIds = 'Elige al menos un ejercicio.';
    else if (!input.exerciseIds.every((id) => EXERCISES.some((e) => e.id === id)))
        errors.exerciseIds = 'Hay ejercicios que no existen.';
    return errors;
}
