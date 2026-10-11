import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../../auth/entities/user.entity';

import { ActivityExercise } from './activity-exercise.entity';
import { Routine } from './routine.entity';

@Entity('activity_logs')
export class ActivityLog {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, (user) => user.activityLogs, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @ManyToOne(() => Routine, (routine) => routine.activityLogs, { nullable: false })
    @JoinColumn({ name: 'routine_id' })
    routine!: Routine;

    @Column({ name: 'started_at', type: 'timestamp' })
    startedAt!: Date;

    @Column({ name: 'completed_at', type: 'timestamp', nullable: true })
    completedAt!: Date | null;

    @Column({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt!: Date;

    @OneToMany(() => ActivityExercise, (activityExercise) => activityExercise.activityLog)
    activityExercises!: ActivityExercise[];
}
