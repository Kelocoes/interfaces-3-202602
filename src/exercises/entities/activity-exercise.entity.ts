import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ActivityLog } from './activity-log.entity';
import { RoutineExercise } from './routine-exercise.entity';

@Entity('activity_exercises')
export class ActivityExercise {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => ActivityLog, (activityLog) => activityLog.activityExercises, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'activity_log_id' })
    activityLog!: ActivityLog;

    @ManyToOne(() => RoutineExercise, (routineExercise) => routineExercise.activityExercises, {
        nullable: false,
        onDelete: 'RESTRICT',
    })
    @JoinColumn({ name: 'routine_exercise_id' })
    routineExercise!: RoutineExercise;

    @Column({ name: 'actual_sets', type: 'int' })
    actualSets!: number;

    @Column({ name: 'actual_reps', type: 'int' })
    actualReps!: number;

    @Column({ name: 'actual_weight_kg', type: 'real' })
    actualWeightKg!: number;

    @Column({ name: 'actual_duration_min', type: 'int' })
    actualDurationMin!: number;

    @Column({ name: 'calories_burned', type: 'real' })
    caloriesBurned!: number;

    @Column({ name: 'distance_covered_km', type: 'real' })
    distanceCoveredKm!: number;

    @Column({ name: 'started_at', type: 'timestamp' })
    startedAt!: Date;

    @Column({ name: 'completed_at', type: 'timestamp', nullable: true })
    completedAt!: Date | null;
}
