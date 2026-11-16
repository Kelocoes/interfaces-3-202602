
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Routine } from './entities/routine.entity';

@Injectable()
export class RoutinesService {
    constructor(
        @InjectRepository(Routine)
        private readonly routineRepository: Repository<Routine>,
    ) {}

    findAll(): Promise<Routine[]> {
        return this.routineRepository.find();
    }

    async findOne(id: number): Promise<Routine> {
        const routine = await this.routineRepository.findOne({
            where: { id },
        });

        if (!routine) {
            throw new NotFoundException(`Rutina con id ${id} no encontrada`);
        }

        return routine;
    }

    async create(data: Partial<Routine>): Promise<Routine> {
        const routine = this.routineRepository.create({
            ...data,
            doneIds: [],
        });

        return this.routineRepository.save(routine);
    }

    async toggleDone(id: number, exerciseId: number): Promise<Routine> {
        const routine = await this.findOne(id);

        routine.doneIds = routine.doneIds.includes(exerciseId)
            ? routine.doneIds.filter((doneId) => doneId !== exerciseId)
            : [...routine.doneIds, exerciseId];

        return this.routineRepository.save(routine);
    }

    async remove(id: number): Promise<{ id: number }> {
        const routine = await this.findOne(id);
        await this.routineRepository.remove(routine);

        return { id };
    }
}
