import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { RoutineExercise } from '../../routine-exercise/entities/routine-exercise.entity';

@Entity('exercises') // Tabla "exercises": catálogo de ejercicios
export class Exercise {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ length: 50 }) // strength, cardio, core...
    type: string;

    // "name" = nombre real de la columna en la BD (snake_case), igual que en inserts.sql
    @Column({ name: 'estimated_calories', type: 'float', default: 0 })
    estimatedCalories: number;

    @Column({ name: 'estimated_distance_km', type: 'float', default: 0 })
    estimatedDistanceKm: number;

    @Column({ name: 'estimated_duration_min', type: 'int', default: 0 })
    estimatedDurationMin: number;

    @Column({ length: 100, nullable: true })
    icon: string;

    @CreateDateColumn({ name: 'created_at' }) // TypeORM la llena sola al insertar
    createdAt: Date;

    // Un ejercicio puede estar en muchas rutinas (a través de routine_exercises)
    @OneToMany(() => RoutineExercise, (re) => re.exercise)
    routineExercises: RoutineExercise[];
}
