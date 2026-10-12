import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ActivityLog } from '../activity-log/entities/activity-log.entity';
import { RoutineExercise } from '../routine-exercise/entities/routine-exercise.entity';

import { ActivityExercise } from './entities/activity-exercise.entity';
import { CreateActivityExerciseDto } from './dto/create-activity-exercise.dto';
import { UpdateActivityExerciseDto } from './dto/update-activity-exercise.dto';

@Injectable()
export class ActivityExerciseService {
    constructor(
        @InjectRepository(ActivityExercise)
        private readonly activityExerciseRepository: Repository<ActivityExercise>,
        @InjectRepository(ActivityLog)
        private readonly activityLogRepository: Repository<ActivityLog>,
        @InjectRepository(RoutineExercise)
        private readonly routineExerciseRepository: Repository<RoutineExercise>,
    ) {}

    async create(dto: CreateActivityExerciseDto): Promise<ActivityExercise> {
        const { activityLogId, routineExerciseId, ...data } = dto;

        const activityLog = await this.activityLogRepository.findOneBy({ id: activityLogId });
        if (!activityLog) throw new NotFoundException(`Sesión de actividad con ID ${activityLogId} no encontrado`);

        const routineExercise = await this.routineExerciseRepository.findOneBy({ id: routineExerciseId });
        if (!routineExercise)
            throw new NotFoundException(`Ejercicio de rutina con ID ${routineExerciseId} no encontrado`);

        const entity = this.activityExerciseRepository.create({ ...data, activityLog, routineExercise });
        const saved = await this.activityExerciseRepository.save(entity);
        return await this.findOne(saved.id);
    }

    async findAll(): Promise<ActivityExercise[]> {
        return await this.activityExerciseRepository.find({
            relations: { activityLog: true, routineExercise: true },
            order: { id: 'ASC' },
        });
    }

    async findOne(id: number): Promise<ActivityExercise> {
        const entity = await this.activityExerciseRepository.findOne({
            where: { id },
            relations: { activityLog: true, routineExercise: true },
        });
        if (!entity) throw new NotFoundException(`Ejercicio de actividad con ID ${id} no encontrado`);
        return entity;
    }

    async update(id: number, dto: UpdateActivityExerciseDto): Promise<ActivityExercise> {
        const entity = await this.findOne(id);
        Object.assign(entity, dto);
        await this.activityExerciseRepository.save(entity);
        return await this.findOne(id);
    }

    async remove(id: number): Promise<{ id: number }> {
        await this.findOne(id);
        await this.activityExerciseRepository.delete(id);
        return { id };
    }
}
