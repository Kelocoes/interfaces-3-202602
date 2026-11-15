
export type Category = 'fuerza' | 'cardio' | 'movilidad';

export interface Exercise {
    id: number;
    name: string;
    category: Category;
    muscle: string;
    durationMin: number;
    description: string;
    image: string;
}

export const CATEGORIES: { value: Category; label: string }[] = [
    { value: 'fuerza', label: 'Fuerza' },
    { value: 'cardio', label: 'Cardio' },
    { value: 'movilidad', label: 'Movilidad' },
];
