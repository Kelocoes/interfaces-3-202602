import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Routine } from '../routine/entities/routine.entity';
import { Exercise } from '../exercise/entities/exercise.entity';

import { RoutineExercise } from './entities/routine-exercise.entity';
import { CreateRoutineExerciseDto } from './dto/create-routine-exercise.dto';
import { UpdateRoutineExerciseDto } from './dto/update-routine-exercise.dto';

@Injectable()
export class RoutineExerciseService {
    constructor(
        @InjectRepository(RoutineExercise)
        private readonly routineExerciseRepository: Repository<RoutineExercise>,
        @InjectRepository(Routine)
        private readonly routineRepository: Repository<Routine>,
        @InjectRepository(Exercise)
        private readonly exerciseRepository: Repository<Exercise>,
    ) {}

    async create(dto: CreateRoutineExerciseDto): Promise<RoutineExercise> {
        const { routineId, exerciseId, ...data } = dto;

        const routine = await this.routineRepository.findOneBy({ id: routineId });
        if (!routine) throw new NotFoundException(`Rutina con ID ${routineId} no encontrado`);

        const exercise = await this.exerciseRepository.findOneBy({ id: exerciseId });
        if (!exercise) throw new NotFoundException(`Ejercicio con ID ${exerciseId} no encontrado`);

        const entity = this.routineExerciseRepository.create({ ...data, routine, exercise });
        const saved = await this.routineExerciseRepository.save(entity);
        return await this.findOne(saved.id);
    }

    async findAll(): Promise<RoutineExercise[]> {
        return await this.routineExerciseRepository.find({
            relations: { routine: true, exercise: true },
            order: { id: 'ASC' },
        });
    }

    async findOne(id: number): Promise<RoutineExercise> {
        const entity = await this.routineExerciseRepository.findOne({
            where: { id },
            relations: { routine: true, exercise: true },
        });
        if (!entity) throw new NotFoundException(`Ejercicio de rutina con ID ${id} no encontrado`);
        return entity;
    }

    async update(id: number, dto: UpdateRoutineExerciseDto): Promise<RoutineExercise> {
        const entity = await this.findOne(id);
        Object.assign(entity, dto);
        await this.routineExerciseRepository.save(entity);
        return await this.findOne(id);
    }

    async remove(id: number): Promise<{ id: number }> {
        await this.findOne(id);
        await this.routineExerciseRepository.delete(id);
        return { id };
    }
}
