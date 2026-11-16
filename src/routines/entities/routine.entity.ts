
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('routines')
export class Routine {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100 })
    name!: string;

    @Column({ type: 'text' })
    description!: string;

    @Column({ length: 20 })
    level!: string;

    @Column({ type: 'jsonb', default: [] })
    exerciseIds!: number[];

    @Column({ type: 'jsonb', default: [] })
    doneIds!: number[];
}

