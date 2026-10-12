import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Exercise } from './entities/exercise.entity';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Injectable()
export class ExerciseService {
    constructor(
        @InjectRepository(Exercise)
        private readonly exerciseRepository: Repository<Exercise>,
    ) {}

    // CREAR: create() arma el objeto en memoria, save() hace el INSERT
    async create(dto: CreateExerciseDto): Promise<Exercise> {
        const exercise = this.exerciseRepository.create(dto);
        return await this.exerciseRepository.save(exercise);
    }

    // LISTAR
    async findAll(): Promise<Exercise[]> {
        return await this.exerciseRepository.find({ order: { id: 'ASC' } });
    }

    // CONSULTAR POR ID ( 404 si no existe)
    async findOne(id: number): Promise<Exercise> {
        const exercise = await this.exerciseRepository.findOneBy({ id });
        if (!exercise) {
            throw new NotFoundException(`Ejercicio con ID ${id} no encontrado`);
        }
        return exercise;
    }

    // ACTUALIZAR: busca (por si no existe), mezcla los cambios y guarda
    async update(id: number, dto: UpdateExerciseDto): Promise<Exercise> {
        const exercise = await this.findOne(id);
        Object.assign(exercise, dto);
        return await this.exerciseRepository.save(exercise);
    }

    // ELIMINAR
    async remove(id: number): Promise<{ id: number }> {
        await this.findOne(id); // si no existe lanza 404
        await this.exerciseRepository.delete(id);
        return { id };
    }
}
