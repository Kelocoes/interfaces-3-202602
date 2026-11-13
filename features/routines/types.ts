export type Level = 'principiante' | 'intermedio' | 'avanzado';

export const LEVELS: { value: Level; label: string }[] = [
    { value: 'principiante', label: 'Principiante' },
    { value: 'intermedio', label: 'Intermedio' },
    { value: 'avanzado', label: 'Avanzado' },
];

export interface Routine {
    id: number;
    name: string;
    description: string;
    level: Level;
    exerciseIds: number[];
    doneIds: number[]; 
}

export interface RoutineInput {
    name: string;
    description: string;
    level: string;
    exerciseIds: number[];
}