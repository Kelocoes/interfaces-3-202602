import type { Level, Routine, RoutineInput } from './types';

// En globalThis para sobrevivir al hot reload
const g = globalThis as unknown as { routines?: Routine[] };
g.routines ??= [
    { id: 1, name: 'Piernas de acero', description: 'Rutina de fuerza para tren inferior.', level: 'intermedio', exerciseIds: [1, 4, 3], doneIds: [] },
    { id: 2, name: 'Despertar suave', description: 'Activación ligera para empezar el día.', level: 'principiante', exerciseIds: [8, 5], doneIds: [] },
];

export const routinesStore = {
    list: () => g.routines!,
    get: (id: number) => g.routines!.find((r) => r.id === id),
    create(input: RoutineInput): Routine {
        const routine: Routine = {
            id: Math.max(0, ...g.routines!.map((r) => r.id)) + 1,
            name: input.name.trim(),
            description: input.description.trim(),
            level: input.level as Level,
            exerciseIds: input.exerciseIds,
            doneIds: [],
        };
        g.routines!.push(routine);
        return routine;
    },
    toggleDone(id: number, exerciseId: number) {
        const r = g.routines!.find((x) => x.id === id);
        if (!r) return;
        r.doneIds = r.doneIds.includes(exerciseId)
            ? r.doneIds.filter((e) => e !== exerciseId)
            : [...r.doneIds, exerciseId];
    },
};
