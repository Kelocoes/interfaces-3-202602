import type { Category, Exercise } from "./types";

const COLORS: Record<Category, string> = {
  fuerza: "5454e9",
  cardio: "e9683b",
  movilidad: "4cb979",
};

const img = (category: Category, text: string) =>
  `https://placehold.co/800x600/${COLORS[category]}/ffffff/png?text=${encodeURIComponent(text)}`;

export const EXERCISES: Exercise[] = [
  {
    id: 1,
    name: "Sentadilla",
    category: "fuerza",
    muscle: "Piernas",
    durationMin: 10,
    image: img("fuerza", "Sentadilla"),
    description:
      "Separa los pies al ancho de los hombros, baja la cadera como si te sentaras en una silla y vuelve a subir manteniendo la espalda recta.",
  },
  {
    id: 2,
    name: "Flexiones",
    category: "fuerza",
    muscle: "Pecho y brazos",
    durationMin: 8,
    image: img("fuerza", "Flexiones"),
    description:
      "Con las manos apoyadas bajo los hombros y el cuerpo recto, baja el pecho hacia el suelo y empuja para volver a subir.",
  },
  {
    id: 3,
    name: "Plancha",
    category: "fuerza",
    muscle: "Abdomen",
    durationMin: 5,
    image: img("fuerza", "Plancha"),
    description:
      "Apoya antebrazos y puntas de los pies y sostén el cuerpo en línea recta sin dejar caer la cadera.",
  },
  {
    id: 4,
    name: "Zancadas",
    category: "fuerza",
    muscle: "Piernas y glúteos",
    durationMin: 10,
    image: img("fuerza", "Zancadas"),
    description:
      "Da un paso largo hacia adelante, baja hasta que ambas rodillas formen un ángulo recto y regresa a la posición inicial.",
  },
  {
    id: 5,
    name: "Saltos de tijera",
    category: "cardio",
    muscle: "Cuerpo completo",
    durationMin: 6,
    image: img("cardio", "Saltos de tijera"),
    description:
      "Salta abriendo piernas y brazos al mismo tiempo y vuelve a cerrarlos en el siguiente salto, a un ritmo constante.",
  },
  {
    id: 6,
    name: "Trote suave",
    category: "cardio",
    muscle: "Piernas y corazón",
    durationMin: 20,
    image: img("cardio", "Trote suave"),
    description:
      "Trota a un ritmo cómodo que te permita hablar sin ahogarte, con pasos cortos y los brazos relajados.",
  },
  {
    id: 7,
    name: "Estiramiento de isquiotibiales",
    category: "movilidad",
    muscle: "Parte trasera del muslo",
    durationMin: 5,
    image: img("movilidad", "Isquiotibiales"),
    description:
      "Sentada con una pierna estirada, inclina el tronco hacia el pie sin rebotar y mantén la posición unos segundos.",
  },
  {
    id: 8,
    name: "Postura del gato y la vaca",
    category: "movilidad",
    muscle: "Columna",
    durationMin: 5,
    image: img("movilidad", "Gato y vaca"),
    description:
      "En cuatro apoyos, alterna entre arquear la espalda hacia arriba y hundirla hacia abajo, acompañando el movimiento con la respiración.",
  },
];
