
import type { Category, Exercise } from './types';

// Colores de la marca por categoría
const COLORS: Record<Category, string> = {
    fuerza: '5454e9',
    cardio: 'e9683b',
    movilidad: '4cb979',
};

// Genera las imágenes
const img = (category: Category, text: string) =>
    `https://placehold.co/800x600/${COLORS[category]}/ffffff/png?text=${encodeURIComponent(text)}`;

export const EXERCISES: Exercise[] = [
    { id: 1, name: 'Sentadilla', category: 'fuerza', muscle: 'Piernas', durationMin: 10, image: img('fuerza', 'Sentadilla'), description: 'Baja la cadera como si te sentaras, con la espalda recta y las rodillas alineadas con los pies.' },
    { id: 2, name: 'Flexiones', category: 'fuerza', muscle: 'Pecho y brazos', durationMin: 8, image: img('fuerza', 'Flexiones'), description: 'Apoya manos y puntas de los pies, baja el pecho al suelo y empuja hasta estirar los brazos.' },
    { id: 3, name: 'Plancha', category: 'fuerza', muscle: 'Abdomen', durationMin: 5, image: img('fuerza', 'Plancha'), description: 'Mantén el cuerpo en línea recta apoyado en antebrazos y puntas de los pies.' },
    { id: 4, name: 'Zancadas', category: 'fuerza', muscle: 'Piernas y glúteos', durationMin: 10, image: img('fuerza', 'Zancadas'), description: 'Da un paso largo al frente y baja hasta que ambas rodillas formen un ángulo de 90 grados.' },
    { id: 5, name: 'Saltos de tijera', category: 'cardio', muscle: 'Cuerpo completo', durationMin: 6, image: img('cardio', 'Saltos de tijera'), description: 'Salta abriendo piernas y brazos a la vez, y vuelve a la posición inicial.' },
    { id: 6, name: 'Trote suave', category: 'cardio', muscle: 'Piernas y corazón', durationMin: 20, image: img('cardio', 'Trote suave'), description: 'Ritmo constante en el que puedas conversar sin quedarte sin aire.' },
    { id: 7, name: 'Estiramiento de isquiotibiales', category: 'movilidad', muscle: 'Parte trasera del muslo', durationMin: 5, image: img('movilidad', 'Isquiotibiales'), description: 'Sentado con una pierna estirada, inclínate hacia el pie sin rebotar.' },
    { id: 8, name: 'Postura del gato y la vaca', category: 'movilidad', muscle: 'Columna', durationMin: 5, image: img('movilidad', 'Gato y vaca'), description: 'En cuatro apoyos, alterna arquear y redondear la espalda al ritmo de la respiración.' },
];
