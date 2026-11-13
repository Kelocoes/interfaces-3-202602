import type { Level, Routine, RoutineInput } from './types';

const globalForRoutines = globalThis as unknown as { routines?: Routine[] };

const routines: Routine[] = (globalForRoutines.routines ??= [
    {
        id: 1,
        name: 'Piernas de acero',
        description: 'Tres ejercicios para trabajar piernas y glúteos en casa.',
        level: 'intermedio',
        exerciseIds: [1, 4, 3],
        doneIds: [],
    },
    {
        id: 2,
        name: 'Despertar suave',
        description: 'Movilidad y cardio ligero para empezar el día.',
        level: 'principiante',
        exerciseIds: [8, 5],
        doneIds: [],
    },
]);

export const routinesStore = {
    list(): Routine[] {
        return routines;
    },

    get(id: number): Routine | undefined {
        return routines.find((routine) => routine.id === id);
    },

    create(input: RoutineInput): Routine {
        const routine: Routine = {
            id: Math.max(0, ...routines.map((r) => r.id)) + 1,
            name: input.name.trim(),
            description: input.description.trim(),
            level: input.level as Level,
            exerciseIds: input.exerciseIds,
            doneIds: [],
        };
        routines.push(routine);
        return routine;
    },

    toggleDone(id: number, exerciseId: number): void {
        const routine = routines.find((r) => r.id === id);
        if (!routine) return;
        routine.doneIds = routine.doneIds.includes(exerciseId)
            ? routine.doneIds.filter((done) => done !== exerciseId)
            : [...routine.doneIds, exerciseId];
    },
};