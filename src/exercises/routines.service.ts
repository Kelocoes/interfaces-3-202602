import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ActivityLog } from './entities/activity-log.entity';
import { Routine } from './entities/routine.entity';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';

@Injectable()
export class RoutinesService {
    constructor(
        @InjectRepository(Routine)
        private readonly routineRepository: Repository<Routine>,
        @InjectRepository(ActivityLog)
        private readonly activityLogRepository: Repository<ActivityLog>,
    ) {}

    async create(userId: number, dto: CreateRoutineDto): Promise<Routine> {
        const routine = this.routineRepository.create({
            ...dto,
            user: { id: userId },
        });

        return this.routineRepository.save(routine);
    }

    async findAll(userId: number): Promise<Routine[]> {
        return this.routineRepository.find({
            where: { user: { id: userId } },
            relations: {
                routineExercises: {
                    exercise: true,
                },
            },
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: number, userId: number): Promise<Routine> {
        const routine = await this.routineRepository.findOne({
            where: {
                id,
                user: { id: userId },
            },
            relations: {
                routineExercises: {
                    exercise: true,
                },
            },
        });

        if (!routine) {
            throw new NotFoundException(`No se encontró la rutina con id ${id}`);
        }

        return routine;
    }

    async update(id: number, userId: number, dto: UpdateRoutineDto): Promise<Routine> {
        const routine = await this.findOne(id, userId);
        Object.assign(routine, dto);

        return this.routineRepository.save(routine);
    }

    async remove(id: number, userId: number): Promise<void> {
        const routine = await this.findOne(id, userId);
        const activityCount = await this.activityLogRepository.count({
            where: { routine: { id } },
        });

        if (activityCount > 0) {
            throw new ConflictException(
                'No se puede eliminar una rutina que ya tiene sesiones registradas'
            );
        }

        await this.routineRepository.remove(routine);
    }
}
