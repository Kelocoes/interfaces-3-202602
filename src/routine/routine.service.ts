import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserNotFoundException } from '../common/exceptions';
import { User } from '../auth/entities/user.entity';

import { Routine } from './entities/routine.entity';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';

@Injectable()
export class RoutineService {
    constructor(
        @InjectRepository(Routine)
        private readonly routineRepository: Repository<Routine>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(dto: CreateRoutineDto): Promise<Routine> {
        const { userId, ...data } = dto;
        // Verifico que el usuario exista antes de relacionarlo
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new UserNotFoundException(userId);
        }
        const routine = this.routineRepository.create({ ...data, user });
        const saved = await this.routineRepository.save(routine);
        return await this.findOne(saved.id);
    }

    async findAll(): Promise<Routine[]> {
        return await this.routineRepository.find({
            relations: { user: true },
            select: { user: { id: true, username: true, email: true } }, // no exponemos el hash del password
            order: { id: 'ASC' },
        });
    }

    async findOne(id: number): Promise<Routine> {
        const routine = await this.routineRepository.findOne({
            where: { id },
            relations: { user: true, routineExercises: { exercise: true } },
            select: { user: { id: true, username: true, email: true } },
        });
        if (!routine) {
            throw new NotFoundException(`Rutina con ID ${id} no encontrado`);
        }
        return routine;
    }

    async update(id: number, dto: UpdateRoutineDto): Promise<Routine> {
        const routine = await this.findOne(id);
        Object.assign(routine, dto);
        await this.routineRepository.save(routine);
        return await this.findOne(id);
    }

    async remove(id: number): Promise<{ id: number }> {
        await this.findOne(id);
        await this.routineRepository.delete(id);
        return { id };
    }
}
