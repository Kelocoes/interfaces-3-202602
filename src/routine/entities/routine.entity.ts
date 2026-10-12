import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { User } from '../../auth/entities/user.entity';
import { RoutineExercise } from '../../routine-exercise/entities/routine-exercise.entity';
import { ActivityLog } from '../../activity-log/entities/activity-log.entity';

@Entity('routines')
export class Routine {
    @PrimaryGeneratedColumn()
    id: number;

    // Muchas rutinas pertenecen a un usuario. La FK (user_id) vive en ESTA tabla (lado "muchos")
    @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ length: 100 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' }) // Se actualiza sola en cada save()
    updatedAt: Date;

    @OneToMany(() => RoutineExercise, (re) => re.routine)
    routineExercises: RoutineExercise[];

    @OneToMany(() => ActivityLog, (log) => log.routine)
    activityLogs: ActivityLog[];
}
