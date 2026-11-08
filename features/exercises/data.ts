import type { Category, Exercise } from './types';

const COLORS: Record<Category, string> = {
    fuerza: '5454e9',
    cardio: 'e9683b',
    movilidad: '4cb979',
};

const img = (category: Category, text: string) =>
    `https://placehold.co/800x600/${COLORS[category]}/ffffff/png?text=${encodeURIComponent(text)}`;

export const EXERCISES: Exercise[] = [
    { id: 1, name: 'Sentadilla', category: 'fuerza', muscle: 'Piernas', durationMin: 10, description: 'Flexiona rodillas y cadera manteniendo la espalda recta y el peso en los talones.', image: img('fuerza', 'Sentadilla') },
    { id: 2, name: 'Flexiones', category: 'fuerza', muscle: 'Pecho y brazos', durationMin: 8, description: 'Baja el pecho al suelo con el cuerpo alineado y empuja hasta extender los brazos.', image: img('fuerza', 'Flexiones') },
    { id: 3, name: 'Plancha', category: 'fuerza', muscle: 'Abdomen', durationMin: 5, description: 'Sostén el cuerpo recto apoyado en antebrazos y puntas de los pies.', image: img('fuerza', 'Plancha') },
    { id: 4, name: 'Zancadas', category: 'fuerza', muscle: 'Piernas y glúteos', durationMin: 10, description: 'Da un paso largo al frente y baja hasta que ambas rodillas formen 90 grados.', image: img('fuerza', 'Zancadas') },
    { id: 5, name: 'Saltos de tijera', category: 'cardio', muscle: 'Cuerpo completo', durationMin: 6, description: 'Salta abriendo piernas y brazos a la vez y vuelve a la posición inicial.', image: img('cardio', 'Saltos de tijera') },
    { id: 6, name: 'Trote suave', category: 'cardio', muscle: 'Piernas y corazón', durationMin: 20, description: 'Trota a un ritmo en el que puedas conversar sin quedarte sin aire.', image: img('cardio', 'Trote suave') },
    { id: 7, name: 'Estiramiento de isquiotibiales', category: 'movilidad', muscle: 'Parte trasera del muslo', durationMin: 5, description: 'Sentado, extiende una pierna e inclínate hacia el pie sin curvar la espalda.', image: img('movilidad', 'Isquiotibiales') },
    { id: 8, name: 'Postura del gato y la vaca', category: 'movilidad', muscle: 'Columna', durationMin: 5, description: 'A cuatro apoyos, alterna arquear y redondear la espalda al ritmo de la respiración.', image: img('movilidad', 'Gato y vaca') },
];
