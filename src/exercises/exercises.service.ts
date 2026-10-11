import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Exercise } from './entities/exercise.entity';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Injectable()
export class ExercisesService {
    constructor(
        @InjectRepository(Exercise)
        private readonly exerciseRepository: Repository<Exercise>,
    ) {}

    async create(dto: CreateExerciseDto): Promise<Exercise> {
        const exercise = this.exerciseRepository.create(dto);
        return this.exerciseRepository.save(exercise);
    }

    async findAll(): Promise<Exercise[]> {
        return this.exerciseRepository.find({
            order: { name: 'ASC' },
        });
    }

    async findOne(id: number): Promise<Exercise> {
        const exercise = await this.exerciseRepository.findOneBy({ id });

        if (!exercise) {
            throw new NotFoundException(`No se encontró el ejercicio con id ${id}`);
        }

        return exercise;
    }

    async update(id: number, dto: UpdateExerciseDto): Promise<Exercise> {
        const exercise = await this.findOne(id);
        Object.assign(exercise, dto);
        return this.exerciseRepository.save(exercise);
    }

    async remove(id: number): Promise<void> {
        const exercise = await this.findOne(id);
        await this.exerciseRepository.remove(exercise);
    }
}
