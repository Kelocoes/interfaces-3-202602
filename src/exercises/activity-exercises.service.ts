import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateActivityExerciseDto } from './dto/create-activity-exercise.dto';
import { UpdateActivityExerciseDto } from './dto/update-activity-exercise.dto';
import { ActivityExercise } from './entities/activity-exercise.entity';
import { ActivityLog } from './entities/activity-log.entity';
import { RoutineExercise } from './entities/routine-exercise.entity';

@Injectable()
export class ActivityExercisesService {
    constructor(
        @InjectRepository(ActivityExercise)
        private readonly activityExerciseRepository: Repository<ActivityExercise>,
        @InjectRepository(ActivityLog)
        private readonly activityLogRepository: Repository<ActivityLog>,
        @InjectRepository(RoutineExercise)
        private readonly routineExerciseRepository: Repository<RoutineExercise>,
    ) {}

    async create(
        activityLogId: number,
        userId: number,
        dto: CreateActivityExerciseDto,
    ): Promise<ActivityExercise> {
        const activityLog = await this.findOwnedLog(activityLogId, userId);
        const routineExercise = await this.findRoutineExercise(
            dto.routineExerciseId,
            activityLog.routine.id,
        );

        const activityExercise = this.activityExerciseRepository.create({
            activityLog,
            routineExercise,
            actualSets: dto.actualSets,
            actualReps: dto.actualReps,
            actualWeightKg: dto.actualWeightKg,
            actualDurationMin: dto.actualDurationMin,
            caloriesBurned: dto.caloriesBurned,
            distanceCoveredKm: dto.distanceCoveredKm,
            startedAt: new Date(dto.startedAt),
            completedAt: dto.completedAt ? new Date(dto.completedAt) : null,
        });

        const saved = await this.activityExerciseRepository.save(activityExercise);
        return this.findOne(activityLogId, saved.id, userId);
    }

    async findAll(
        activityLogId: number,
        userId: number,
    ): Promise<ActivityExercise[]> {
        await this.findOwnedLog(activityLogId, userId);

        return this.activityExerciseRepository.find({
            where: {
                activityLog: {
                    id: activityLogId,
                    user: { id: userId },
                },
            },
            relations: {
                routineExercise: {
                    exercise: true,
                },
            },
            order: { startedAt: 'ASC' },
        });
    }

    async findOne(
        activityLogId: number,
        id: number,
        userId: number,
    ): Promise<ActivityExercise> {
        const activityExercise = await this.activityExerciseRepository.findOne({
            where: {
                id,
                activityLog: {
                    id: activityLogId,
                    user: { id: userId },
                },
            },
            relations: {
                routineExercise: {
                    exercise: true,
                },
            },
        });

        if (!activityExercise) {
            throw new NotFoundException(
                `No se encontró el ejercicio ${id} en la sesión ${activityLogId}`,
            );
        }

        return activityExercise;
    }

    async update(
        activityLogId: number,
        id: number,
        userId: number,
        dto: UpdateActivityExerciseDto,
    ): Promise<ActivityExercise> {
        const activityExercise = await this.findOne(activityLogId, id, userId);

        if (dto.routineExerciseId !== undefined) {
            const activityLog = await this.findOwnedLog(activityLogId, userId);
            activityExercise.routineExercise = await this.findRoutineExercise(
                dto.routineExerciseId,
                activityLog.routine.id,
            );
        }

        if (dto.actualSets !== undefined) activityExercise.actualSets = dto.actualSets;
        if (dto.actualReps !== undefined) activityExercise.actualReps = dto.actualReps;
        if (dto.actualWeightKg !== undefined) activityExercise.actualWeightKg = dto.actualWeightKg;
        if (dto.actualDurationMin !== undefined) {
            activityExercise.actualDurationMin = dto.actualDurationMin;
        }
        if (dto.caloriesBurned !== undefined) {
            activityExercise.caloriesBurned = dto.caloriesBurned;
        }
        if (dto.distanceCoveredKm !== undefined) {
            activityExercise.distanceCoveredKm = dto.distanceCoveredKm;
        }
        if (dto.startedAt !== undefined) {
            activityExercise.startedAt = new Date(dto.startedAt);
        }
        if (dto.completedAt !== undefined) {
            activityExercise.completedAt = dto.completedAt
                ? new Date(dto.completedAt)
                : null;
        }

        await this.activityExerciseRepository.save(activityExercise);
        return this.findOne(activityLogId, id, userId);
    }

    async remove(
        activityLogId: number,
        id: number,
        userId: number,
    ): Promise<void> {
        const activityExercise = await this.findOne(activityLogId, id, userId);
        await this.activityExerciseRepository.remove(activityExercise);
    }

    private async findOwnedLog(
        activityLogId: number,
        userId: number,
    ): Promise<ActivityLog> {
        const activityLog = await this.activityLogRepository.findOne({
            where: {
                id: activityLogId,
                user: { id: userId },
            },
            relations: { routine: true },
        });

        if (!activityLog) {
            throw new NotFoundException(
                `No se encontró la sesión con id ${activityLogId}`,
            );
        }

        return activityLog;
    }

    private async findRoutineExercise(
        routineExerciseId: number,
        routineId: number,
    ): Promise<RoutineExercise> {
        const routineExercise = await this.routineExerciseRepository.findOne({
            where: {
                id: routineExerciseId,
                routine: { id: routineId },
            },
            relations: {
                exercise: true,
            },
        });

        if (!routineExercise) {
            throw new NotFoundException(
                `El ejercicio ${routineExerciseId} no pertenece a la rutina de esta sesión`,
            );
        }

        return routineExercise;
    }
}