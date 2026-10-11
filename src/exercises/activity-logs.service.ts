import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { UpdateActivityLogDto } from './dto/update-activity-log.dto';
import { ActivityLog } from './entities/activity-log.entity';
import { Routine } from './entities/routine.entity';

@Injectable()
export class ActivityLogsService {
    constructor(
        @InjectRepository(ActivityLog)
        private readonly activityLogRepository: Repository<ActivityLog>,
        @InjectRepository(Routine)
        private readonly routineRepository: Repository<Routine>,
    ) {}

    async create(userId: number, dto: CreateActivityLogDto): Promise<ActivityLog> {
        const routine = await this.routineRepository.findOne({
            where: {
                id: dto.routineId,
                user: { id: userId },
            },
        });

        if (!routine) {
            throw new NotFoundException(
                `No se encontró la rutina con id ${dto.routineId}`,
            );
        }

        const activityLog = this.activityLogRepository.create({
            user: { id: userId },
            routine,
            startedAt: new Date(dto.startedAt),
            completedAt: dto.completedAt ? new Date(dto.completedAt) : null,
        });

        const saved = await this.activityLogRepository.save(activityLog);
        return this.findOne(saved.id, userId);
    }

    async findAll(userId: number): Promise<ActivityLog[]> {
        return this.activityLogRepository.find({
            where: { user: { id: userId } },
            relations: {
                routine: true,
                activityExercises: {
                    routineExercise: {
                        exercise: true,
                    },
                },
            },
            order: { startedAt: 'DESC' },
        });
    }

    async findOne(id: number, userId: number): Promise<ActivityLog> {
        const activityLog = await this.activityLogRepository.findOne({
            where: {
                id,
                user: { id: userId },
            },
            relations: {
                routine: true,
                activityExercises: {
                    routineExercise: {
                        exercise: true,
                    },
                },
            },
        });

        if (!activityLog) {
            throw new NotFoundException(
                `No se encontró la sesión con id ${id}`,
            );
        }

        return activityLog;
    }

    async update(
        id: number,
        userId: number,
        dto: UpdateActivityLogDto,
    ): Promise<ActivityLog> {
        const activityLog = await this.findOne(id, userId);

        if (dto.routineId !== undefined && dto.routineId !== activityLog.routine.id) {
            const routine = await this.routineRepository.findOne({
                where: {
                    id: dto.routineId,
                    user: { id: userId },
                },
            });

            if (!routine) {
                throw new NotFoundException(
                    `No se encontró la rutina con id ${dto.routineId}`,
                );
            }

            activityLog.routine = routine;
        }

        if (dto.startedAt !== undefined) {
            activityLog.startedAt = new Date(dto.startedAt);
        }

        if (dto.completedAt !== undefined) {
            activityLog.completedAt = dto.completedAt
                ? new Date(dto.completedAt)
                : null;
        }

        await this.activityLogRepository.save(activityLog);
        return this.findOne(id, userId);
    }

    async remove(id: number, userId: number): Promise<void> {
        const activityLog = await this.findOne(id, userId);
        await this.activityLogRepository.remove(activityLog);
    }
}