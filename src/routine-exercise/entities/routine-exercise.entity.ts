import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Routine } from '../../routine/entities/routine.entity';
import { Exercise } from '../../exercise/entities/exercise.entity';
import { ActivityExercise } from '../../activity-exercise/entities/activity-exercise.entity';

// Tabla intermedia: qué ejercicios tiene una rutina y con qué METAS (lo planeado)
@Entity('routine_exercises')
export class RoutineExercise {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Routine, (routine) => routine.routineExercises, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'routine_id' })
    routine: Routine;

    @ManyToOne(() => Exercise, (exercise) => exercise.routineExercises, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'exercise_id' })
    exercise: Exercise;

    @Column({ name: 'order_index', type: 'int' })
    orderIndex: number;

    @Column({ name: 'target_sets', type: 'int', nullable: true })
    targetSets: number;

    @Column({ name: 'target_reps', type: 'int', nullable: true })
    targetReps: number;

    @Column({ name: 'target_weight_kg', type: 'float', nullable: true })
    targetWeightKg: number;

    @Column({ name: 'target_duration_min', type: 'int', nullable: true })
    targetDurationMin: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @OneToMany(() => ActivityExercise, (ae) => ae.routineExercise)
    activityExercises: ActivityExercise[];
}
