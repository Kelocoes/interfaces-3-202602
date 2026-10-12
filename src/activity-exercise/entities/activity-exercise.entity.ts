import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ActivityLog } from '../../activity-log/entities/activity-log.entity';
import { RoutineExercise } from '../../routine-exercise/entities/routine-exercise.entity';

// Lo que el usuario realmente hizo en cada ejercicio de una sesión
@Entity('activity_exercises')
export class ActivityExercise {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ActivityLog, (log) => log.activityExercises, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'activity_log_id' })
    activityLog: ActivityLog;

    @ManyToOne(() => RoutineExercise, (re) => re.activityExercises, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'routine_exercise_id' })
    routineExercise: RoutineExercise;

    @Column({ name: 'actual_sets', type: 'int', nullable: true })
    actualSets: number;

    @Column({ name: 'actual_reps', type: 'int', nullable: true })
    actualReps: number;

    @Column({ name: 'actual_weight_kg', type: 'float', nullable: true })
    actualWeightKg: number;

    @Column({ name: 'actual_duration_min', type: 'int', nullable: true })
    actualDurationMin: number;

    @Column({ name: 'calories_burned', type: 'float', nullable: true })
    caloriesBurned: number;

    @Column({ name: 'distance_covered_km', type: 'float', nullable: true })
    distanceCoveredKm: number;

    @Column({ name: 'started_at', type: 'timestamp', nullable: true })
    startedAt: Date;

    @Column({ name: 'completed_at', type: 'timestamp', nullable: true })
    completedAt: Date;
}
