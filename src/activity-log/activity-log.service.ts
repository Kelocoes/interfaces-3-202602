import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserNotFoundException } from '../common/exceptions';
import { User } from '../auth/entities/user.entity';
import { Routine } from '../routine/entities/routine.entity';

import { ActivityLog } from './entities/activity-log.entity';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { UpdateActivityLogDto } from './dto/update-activity-log.dto';

@Injectable()
export class ActivityLogService {
    constructor(
        @InjectRepository(ActivityLog)
        private readonly activityLogRepository: Repository<ActivityLog>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Routine)
        private readonly routineRepository: Repository<Routine>,
    ) {}

    async create(dto: CreateActivityLogDto): Promise<ActivityLog> {
        const { userId, routineId, ...data } = dto;

        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) throw new UserNotFoundException(userId);

        const routine = await this.routineRepository.findOneBy({ id: routineId });
        if (!routine) throw new NotFoundException(`Rutina con ID ${routineId} no encontrado`);

        const log = this.activityLogRepository.create({ ...data, user, routine });
        const saved = await this.activityLogRepository.save(log);
        return await this.findOne(saved.id);
    }

    async findAll(): Promise<ActivityLog[]> {
        return await this.activityLogRepository.find({
            relations: { user: true, routine: true },
            select: { user: { id: true, username: true, email: true } },
            order: { startedAt: 'DESC' },
        });
    }

    async findOne(id: number): Promise<ActivityLog> {
        const log = await this.activityLogRepository.findOne({
            where: { id },
            relations: { user: true, routine: true, activityExercises: true },
            select: { user: { id: true, username: true, email: true } },
        });
        if (!log) throw new NotFoundException(`Sesión de actividad con ID ${id} no encontrado`);
        return log;
    }

    async update(id: number, dto: UpdateActivityLogDto): Promise<ActivityLog> {
        const log = await this.findOne(id);
        Object.assign(log, dto);
        await this.activityLogRepository.save(log);
        return await this.findOne(id);
    }

    async remove(id: number): Promise<{ id: number }> {
        await this.findOne(id);
        await this.activityLogRepository.delete(id);
        return { id };
    }
}
