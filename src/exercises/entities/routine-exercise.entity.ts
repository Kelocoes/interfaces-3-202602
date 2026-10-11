import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ActivityExercise } from './activity-exercise.entity';
import { Exercise } from './exercise.entity';
import { Routine } from './routine.entity';

@Entity('routine_exercises')
export class RoutineExercise {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Routine, (routine) => routine.routineExercises, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'routine_id' })
    routine!: Routine;

    @ManyToOne(() => Exercise, (exercise) => exercise.routineExercises, {
        nullable: false,
        onDelete: 'RESTRICT',
    })
    @JoinColumn({ name: 'exercise_id' })
    exercise!: Exercise;

    @Column({ name: 'order_index', type: 'int' })
    orderIndex!: number;

    @Column({ name: 'target_sets', type: 'int' })
    targetSets!: number;

    @Column({ name: 'target_reps', type: 'int' })
    targetReps!: number;

    @Column({ name: 'target_weight_kg', type: 'real' })
    targetWeightKg!: number;

    @Column({ name: 'target_duration_min', type: 'int' })
    targetDurationMin!: number;

    @Column({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt!: Date;

    @OneToMany(() => ActivityExercise, (activityExercise) => activityExercise.routineExercise)
    activityExercises!: ActivityExercise[];
}
